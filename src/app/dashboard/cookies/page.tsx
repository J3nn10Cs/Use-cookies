import { TabBar } from "@/components/tab-bar/TabBar";
import { getCookie } from 'cookies-next'
import { cookies } from "next/headers";

//TODO -> mr
export const metadata = {
 title: 'Cookies',
 description: 'Cookies',
};

export default async function CookiesPage() {

  const cookieStore = await cookies();
  const cookieTab = cookieStore.get('tab')?.value ?? '1'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div>
        <span className="text-2xl font-bold">Tab</span>
        <TabBar
          currentTab={Number(cookieTab)}
        />
      </div>
    </div>
  );
}