const globalAny: any = global

export default async function ({ email, phone }: { email: string, phone: string }) {
    return globalAny.domain.User.findOne({
        email,
        phone
    });
};
