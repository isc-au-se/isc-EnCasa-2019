import React, { useGlobal } from 'reactn';
import { TextField } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import {
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm
} from '../../Components';
import { addDelivery } from '../../utils/http';

const DeliveryForm = () => {
  const [user, setUser] = useGlobal('user');
  const [open, setOpen] = React.useState(false);

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      fromaddress: '',
      date: '',
      time: '',
      pickuplocation: ''
    },

    onSubmit(val, errors) {
      // alert(JSON.stringify({ val, errors }, null, 2));
      // console.log(val.values);
      // posting delivery here
      // Create a new delivery with a status = 0,
      // the delivery is unassigned to any driver
      if (!errors) {
        addDelivery({ ...val.values, status: 0, customerid: user.id }).then(
          res => console.log(res)
        );
      }
    },

    validate(val) {
      const errors = {};
      if (val.receivingAddress === '') {
        errors.receivingAddress = 'Please enter the receiving address';
      }
      return errors;
    }
  });

  const openDeliveryForm = () => {
    setOpen(true);
  };
  const deliveryForm = {
    dialogTitle: 'Deliver',
    dialogText: 'Add the delivery details!',
    handleConfirm: e => {
      handleSubmit(e);
      setOpen(false);
      // implementation for confirming delivery
    },
    handleClose: () => {
      setOpen(false);
    }
  };
  return (
    <div>
      <MyFloatingActionButton onClick={openDeliveryForm}>
        <EditIcon />
      </MyFloatingActionButton>
      <MyFormDialog
        open={open}
        handleClose={deliveryForm.handleClose}
        handleSubmit={deliveryForm.handleConfirm}
        dialogTitle={deliveryForm.dialogTitle}
        dialogText={deliveryForm.dialogText}
      >
        <form>
          <TextField
            value={values.receivingAddress}
            name="fromaddress"
            label="Address To"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            value={values.date}
            name="date"
            label="Date"
            onChange={handleChange}
          />
          <TextField
            value={values.time}
            name="time"
            label="Time"
            onChange={handleChange}
          />
          <TextField
            value={values.pickupLocation}
            name="pickuplocation"
            label="Pickup Location"
            onChange={handleChange}
          />
        </form>
      </MyFormDialog>
    </div>
  );
};

export default DeliveryForm;