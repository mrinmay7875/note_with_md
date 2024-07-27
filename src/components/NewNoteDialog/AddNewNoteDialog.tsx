import {
  Dialog,
  DialogTrigger,
  Button,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  Label,
  Input,
  DialogActions,
  makeStyles,
  Field,
  Textarea,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export default function NewNoteDialog() {
  const styles = useStyles();

  return (
    <div>
      <Dialog modalType='non-modal'>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance='primary'>Create Note</Button>
        </DialogTrigger>
        <DialogSurface aria-describedby={undefined}>
          <form>
            <DialogBody>
              <DialogTitle>Add New Note</DialogTitle>
              <DialogContent className={styles.content}>
                <Label required htmlFor={'note-title'}>
                  Note title
                </Label>
                <Input required type='text' id={'note-title'} />
                <Label required htmlFor={'note-body'}>
                  Note Body
                </Label>
                <Field label=''>
                  <Textarea size='large' resize='vertical' />
                </Field>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance='secondary'>Close</Button>
                </DialogTrigger>
                <Button type='submit' appearance='primary'>
                  Save
                </Button>
              </DialogActions>
            </DialogBody>
          </form>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
