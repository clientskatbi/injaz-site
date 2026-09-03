import { site } from "@/lib/site";

export function Disclaimer({ updated }: { updated?: string }) {
  return (
    <aside className="mt-12 rounded-[14px] border border-line bg-surface p-5 text-sm leading-[1.8] text-ink-600">
      <p className="m-0">
        <strong className="text-navy-900">تنويه: </strong>
        {site.disclaimer}
      </p>
      {updated && (
        <p className="m-0 mt-3 text-ink-500">
          آخر تحديث للمعلومات: <bdi className="ltr">{updated}</bdi>
        </p>
      )}
    </aside>
  );
}
