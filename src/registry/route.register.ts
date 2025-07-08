export const ROUTES = {
    system: {
        internal_error: "/500",
        unauthorized: "/unauthorized",
        not_found: "/404",
    },
    setting: {
        FAQ_management: "/setting/faq",
        create: "/setting/faq/add-faq",
        edit: (id: string) => `/setting/faq/edit-faq/${id}`,
    },
};
