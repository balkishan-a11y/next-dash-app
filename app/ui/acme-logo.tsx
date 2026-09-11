import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <i className="fa-solid fa-globe text-5xl rotate-[15deg]" />
      <p className="text-[44px] ml-2">Acme</p>
    </div>
  );
}
