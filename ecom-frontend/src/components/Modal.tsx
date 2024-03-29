import ReactDOM from "react-dom";
import { useAppDispatch } from "../store/hooks";
import { toggleCartVisibility } from "../store/slices/cartSlice";
import { setEditModalVisibility } from "../store/slices/productsSlice";

const Backdrop = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => {
        dispatch(toggleCartVisibility(false));
        dispatch(setEditModalVisibility({ id: 0, visibile: false }));
      }}
      className="fixed top-0 left-0 z-40 w-screen h-screen backdrop-blur-md bg-gray-500 bg-opacity-50"
    />
  );
};

interface modalOverlayProps {
  children: React.ReactNode;
  width?: string;
}
const ModalOverlay = ({ children }: modalOverlayProps) => {
  return (
    <div className="fixed top-1/2 left-1/2 items-center border-2 border-gray-300 border-opacity-60 justify-center transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white  rounded-lg my-1">
      <div className="">{children}</div>
    </div>
  );
};

interface modalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: modalProps) => {
  const portalElement = document.getElementById("overlays") as HTMLElement;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
