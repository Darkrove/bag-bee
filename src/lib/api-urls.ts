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
    getAll: "/api/get",
    getSales: ({ from, to }: { from: string; to: string }) =>
      `/api/sales?from=${from}&to=${to}`,
  },
  invoice: {
    add: "/api/invoice/add",
    modify: "/api/invoice",
    getInvoice: ({ from, to }: { from: string; to: string }) =>
      `/api/invoice?from=${from}&to=${to}`,
    getById: ({ id }: { id: string }) => `/api/sales/getbyid?id=${id}`,
  },
  feedback: {
    add: `/api/feedback`,
  },
}
