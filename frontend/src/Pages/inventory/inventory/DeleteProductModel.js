import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import { motion } from "framer-motion";

const DeleteProductModel = ({
  isOpen,
  onOpenChange,
  productId,
  setProduct,
  setProductId,
}) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-gray-800/90 border border-gray-600 backdrop-blur-sm"
      backdrop="blur"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4 className="text-xl font-bold text-cyan-400 animate-pulse">
                  Delete Product
                </h4>
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-300">
                  Are you sure you want to delete this product?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  Cancel
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    color="primary"
                    disabled={!productId}
                    onClick={async () => {
                      if (productId) {
                        try {
                          await axios.delete(
                            `http://localhost:5000/products/${productId}`
                          );
                          setProduct((prevStaff) =>
                            prevStaff.filter((item) => item._id !== productId)
                          );
                          setProductId(null);
                        } catch (error) {
                          console.log(error);
                        }
                      }
                      onClose();
                    }}
                    className={`${
                      !productId
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-cyan-600 hover:bg-cyan-700 hover:shadow-cyan-500/50"
                    } text-white transition-all duration-300 shadow-lg`}
                  >
                    Delete
                  </Button>
                </motion.div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </motion.div>
    </Modal>
  );
};

export default DeleteProductModel;