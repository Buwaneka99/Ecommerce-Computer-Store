import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";

const DeleteSalaryModel = ({
  isOpen,
  onOpenChange,
  salaryId,
  setSalary,
  setSalaryId,
  setRefetch,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h4>Delete Salary</h4>
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this employee salary?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={!salaryId}
                onClick={async () => {
                  if (salaryId) {
                    try {
                      await axios.delete(
                        `http://localhost:5000/salary/${salaryId}`
                      );
                      setSalary((prevStaff) =>
                        prevStaff.filter((item) => item._id !== salaryId)
                      );
                      setSalaryId(null);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  onClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default DeleteSalaryModel;
