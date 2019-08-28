import React from 'reactn';
import { TextField } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import {
  MyFloatingActionButton,
  MyFormDialog,
  MyUseForm,
  MyCheckbox
} from '../../Components';

const PickupForm = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateTo, setDateTo] = React.useState(date);

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
    setDateTo(selectedDate);
  };

  const handleDateToChange = selectedDate => {
    // only change the time if the selected date is later than the date.
    if (selectedDate > date) {
      setDateTo(selectedDate);
    }
  };

  const { values, handleChange, handleSubmit } = MyUseForm({
    initialValues: {
      pickupLocation: '',
      agreement: ''
    },

    onSubmit(val, errors) {
      alert(JSON.stringify({ val, errors }, null, 2));
      // change the delivery status to 1
      // and add a new driverDetails object to delivery
    },

    validate(val) {
      const errors = {};
      if (val.deliverySlip === '') {
        errors.deliverySlip = 'Please upload the delivery slip';
      }
      return errors;
    }
  });

  const openPickupForm = () => {
    setOpen(true);
  };
  const pickupForm = {
    dialogTitle: 'Pickup Form',
    dialogText: 'Add the pickup details!',
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
      <MyFloatingActionButton onClick={openPickupForm}>
        <AddIcon />
      </MyFloatingActionButton>
      <MyFormDialog
        open={open}
        handleClose={pickupForm.handleClose}
        handleSubmit={pickupForm.handleConfirm}
        dialogTitle={pickupForm.dialogTitle}
        dialogText={pickupForm.dialogText}
      >
        <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM-dd-yyyy"
                value={date}
                //   inputProps={{ name: 'date' }}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                disablePast
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardTimePicker
                margin="normal"
                id="time-from"
                label="Time from"
                value={date}
                minutesStep={15}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardTimePicker
                margin="normal"
                id="time-to"
                label="Time to"
                value={dateTo}
                minutesStep={15}
                onChange={handleDateToChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            value={values.pickupLocation}
            name="pickupLocation"
            label="Pickup Address"
            onChange={handleChange}
            style={{ marginBottom: 20 }}
          />
          <MyCheckbox
            name="agreement"
            onChange={handleChange}
            value={values.agreement}
            label="By clicking confirm, you provided us the authority to pickup the item"
          />
        </form>
      </MyFormDialog>
    </div>
  );
};

export default PickupForm;
