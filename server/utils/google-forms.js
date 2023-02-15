const { google } = require('googleapis');

const createNewForm = async({
  title = "Sample Form",
  document_title = undefined,
  tokens
}) => {
  return new Promise(async(resolve, reject)=>{
    try{
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
      );
      oauth2Client.setCredentials(tokens);
      const forms = google.forms({
        version: 'v1',
        auth: oauth2Client,
      });
      if (document_title === undefined ) { document_title = title }
      const newForm = {
        info: {
          title,
          document_title,
        },
      };
      const res = await forms.forms.create({
        requestBody: newForm,
      });
      resolve(res.data);
    } catch(err) {
      reject(err);
    }
  })
}

const updateDescription = async({
  formId,
  description = "Sample Description",
  tokens
}) => {
  return new Promise(async(resolve, reject) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
      );
      oauth2Client.setCredentials(tokens);
      const forms = google.forms({
        version: 'v1',
        auth: oauth2Client,
      });
      const update = {
        requests : [
          {
            updateFormInfo: {
              info: {
                description : description
              },
              updateMask: "description"
            }
          },
        ]
      }
      const res = await forms.forms.batchUpdate({
        formId,
        requestBody: update
      });
      console.log(res.data);
      resolve(res.data)
    } catch (error) {
      reject(error)
    }
  })
}

// test
// createNewForm({ title: "Monkey20", document_title: "Hola", tokens});
// updateDescription({
//   formId: "1r8FJfDV16peXNz9-CJtynpgrXX2JFe7Pvq9i5_7jgZE",
//   description: "This is a test",
//   tokens
// })

module.exports = {
  createNewForm
}