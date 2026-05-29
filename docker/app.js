
const uploadButton = document.getElementById('btn')

uploadButton.addEventListener('click', async (e) => {
  e.preventDefault()
  const FileUpload = document.getElementById('file')
    const selectedFile = FileUpload.files[0]
  if(!selectedFile) {
    console.log(error)
  }
  const formData = new FormData()
  formData.append('file', selectedFile)
try{
    const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  })
   const data = await response.json()
   console.log(data)
   alert('upload successful')
}
 catch (err) {
  console.log(err)

 }
})

