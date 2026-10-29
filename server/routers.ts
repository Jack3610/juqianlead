import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { createLeadSubmission } from "./db";
import { publicProcedure, router } from "./_core/trpc";

const inquiryDirections = [
  "AI工具（非交友/聊天）· 企业网络安全巡检辅助方案",
  "网络与信息安全软件方案咨询",
  "物联网技术研发与应用",
  "网络技术服务与技术咨询",
  "其他合规技术需求",
] as const;

const sensitiveNotePattern = /(?:^|\D)\d{17}[0-9Xx](?:$|\D)|(?:^|\D)\d{16,19}(?:$|\D)|(?:身份证(?:号码|号)?|银行卡号?|银行账户|银行卡账户|联行号|密码|口令)\s*[:：=]\s*\S+/i;

const leadSubmissionInput = z.object({
  contactName: z.string().trim().min(1, "请填写联系人姓名").max(80),
  companyName: z.string().trim().min(1, "请填写企业名称").max(160),
  phone: z.string().trim().min(7).max(24).refine(
    value => /^\+?[0-9]{7,15}$/.test(value.replace(/[\s()\-]/g, "")),
    "请输入有效的联系电话",
  ),
  email: z.string().trim().max(320).email("请输入有效邮箱").optional(),
  interest: z.enum(inquiryDirections),
  message: z.string().trim().max(500, "补充说明最多 500 字").optional().refine(
    value => !value || !sensitiveNotePattern.test(value),
    "补充说明中请勿填写身份证、银行账户或密码等敏感信息",
  ),
  privacyConsent: z.literal(true, "请先阅读并同意信息使用说明"),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  leads: router({
    submit: publicProcedure.input(leadSubmissionInput).mutation(async ({ input }) => {
      try {
        await createLeadSubmission({
          contactName: input.contactName,
          companyName: input.companyName,
          phone: input.phone.replace(/[\s()\-]/g, ""),
          email: input.email || null,
          interest: input.interest,
          message: input.message || null,
        });
        return { success: true } as const;
      } catch (error) {
        // Never log submitted contact details. Return a generic message to the visitor.
        console.error("[Lead] Failed to save inquiry", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "暂时无法保存咨询，请稍后重试" });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
