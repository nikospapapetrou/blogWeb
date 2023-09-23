import notFound from "../public/img/notFound.gif";
export default function NotFound() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <img src={notFound} alt="Not Found" />
    </div>
  );
}
