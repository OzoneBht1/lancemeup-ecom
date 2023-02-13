import ReactDOM from "react-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAppDispatch } from "../store/hooks";
import { toggleCartVisibility } from "../store/slices/cartSlice";

const Backdrop = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => {
        dispatch(toggleCartVisibility(false));
      }}
      className="fixed top-0 left-0 z-40 w-screen h-screen backdrop-blur-sm"
    />
  );
};

interface modalOverlayProps {
  children: React.ReactNode;
}
const ModalOverlay = ({ children }: modalOverlayProps) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-1/2 h-1/2 rounded-lg">
      <div className="">{children}</div>
    </div>
  );
};

interface modalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: modalProps) => {
  console.log("rendering");
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
