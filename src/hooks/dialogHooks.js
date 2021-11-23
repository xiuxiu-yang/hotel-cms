export default function(dialogRef, dialogConfig) {
  const handlerUpdate = (row) => {
    dialogRef.value.dialogTableVisible = true
    for (const i of dialogConfig.formItem) {
      dialogRef.value.formData[i.field] = row[i.field]
    }
  }
  const handlerDelete = (row) => {
    console.log(row)
  }
  const handlerCreate = () => {
    dialogRef.value.dialogTableVisible = true
    for (const i of dialogConfig.formItem) {
      dialogRef.value.formData[i.field] = ''
    }
    console.log(dialogRef.value.formData)
  }

  return [handlerUpdate, handlerDelete, handlerCreate]
}