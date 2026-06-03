export default function Loading() {
  return (
    <div className="section-pad fixed inset-0 z-[70] grid place-items-center bg-[#1a0f0a]/92 text-[#f5e6d0] backdrop-blur-md">
      <div className="text-center">
        <div className="loader-cup mx-auto mb-6">
          <span className="route-steam" />
          <span className="route-steam" />
          <span className="route-steam" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c17f3a]">
          Brewing the next page
        </p>
      </div>
    </div>
  );
}
