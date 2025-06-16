import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const cookieGenerator = async ({ prefix, value }: Props) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value,
    path: "/",
    httpOnly: true,
  });

  console.log(cookies);
};

export const cookieRemover = async (prefix: string) => {
  const cookie = await getCookies();
  cookie.delete(`${prefix}-token`);
};
