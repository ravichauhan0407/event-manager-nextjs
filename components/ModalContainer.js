import Link from "next/link";

const ModalContainer = ({ open, title, children, closeHref = "/" }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
      <div className="bg-white rounded-md px-4 w-[min(100svw,450px)] h-[min(100svh,800px)] overflow-y-scroll">
        <div className="flex justify-between  py-2 items-center sticky top-0 bg-white z-20">
          <div className="font-bold text-primary text-md">{title}</div>
          <Link href={closeHref}>
            <div className="w-8 h-8 cursor-pointer">
              <img src="/cancel.svg" alt="clear" className="w-full h-full" />
            </div>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
