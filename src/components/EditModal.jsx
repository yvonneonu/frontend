import { CloseCircle } from "iconsax-react";
import { createPortal } from "react-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import EditUserInfo from "./EditUserInfo";

const EditModal = ({ showModal, setShowModal, setUsers }) => {
  const { width: browserWidth } = useWindowDimensions();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {createPortal(
        <>
          {showModal ? (
            <>
              <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-zinc-900 bg-opacity-70 backdrop-blur-sm ">
                <div className="relative w-[96%] mx-auto my-6 md:w-[600px]">
                  {/*content*/}
                  <div className="relative flex flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none">
                    {/*header*/}
                    <div className="self-stretch h-[60px] md:h-[88px] px-[42px] py-2.5 bg-gray-50 border-t border-gray-300 justify-between items-center gap-2.5 inline-flex">
                      <div className="md:text-2xl text-[18px]  font-bold sora-bold text-cila-slate-800">
                        Edit Users
                      </div>
                      <div className="w-[52px] h-[52px] justify-center items-center flex ">
                        <div
                          className="w-8 h-8  md:w-[52px]  md:h-[52px] relative cursor-pointer"
                          onClick={handleCloseModal}
                        >
                          <CloseCircle
                            color="#292D32"
                            size={browserWidth < 768 ? 32 : 52}
                          />
                        </div>
                      </div>
                    </div>
                    {/*body*/}
                    <EditUserInfo
                      setShowModal={setShowModal}
                      setUsers={setUsers}
                    />
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
          ) : null}
        </>,
        document.getElementById("portal")
      )}
    </>
  );
};

export default EditModal;
