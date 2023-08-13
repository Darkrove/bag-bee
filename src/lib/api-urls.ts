export const apiUrls = {
  user: {
    upgrade: "/api/user/upgrade",
    modify: "/api/user",
    usage: "api/user/usage",
  },
  auth: {
    signup: "/api/auth/signup",
    signin: "/api/auth/signin",
  },
  sales: {
    add: "/api/sales/add",
    modify: "/api/sales",
    getSales: ({ from, to }: { from: string; to: string }) =>
      `/api/sales?from=${from}&to=${to}`,
  },
  feedback: {
    add: `/api/feedback`,
  },
}
