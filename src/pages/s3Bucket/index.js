import React from 'react';
import { Storage,Amplify,Auth ,AWSService} from "aws-amplify"
import AWS from "aws-sdk";
import { useNavigate } from 'react-router-dom';

const BUCKET = "fairview1"
const KEY = "FVID.json"
function Index() {
  const navigate = useNavigate();
  const[fileList,setFileList]=React.useState([])


 React.useEffect(()=>{
  (async () => {
    AWS.config.region = Auth.configure().region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: Auth.configure().identityPoolId,
    });
    let data = await new AWS.S3().listObjects({ Bucket: BUCKET }).promise()
    if(data){
      data=data.Contents.filter((item)=>item.Key.includes('json'))
      setFileList(data)
    }
    
  })()

 },[])



  return (
    <div className='home'>
      <h6>S3 bucket</h6>
      <div >
      <table id="simple-board">
        <tbody>
        {
          
          fileList.map((item,index)=>{
            return(
              <tr key ={index} className='file-card'>
                    <td className='file-card-heading'>{item.Key}</td>
                    <td>
                     <button className='file-card-button' onClick={()=>navigate(`/editS3/${item.Key}`)}> Edit</button>
                    </td>
                    
              </tr>
            )
          })
        }
        </tbody>
        </table>
      </div>
      


    </div>
  );
}

export default Index;
