import { useState } from "react";
import "./Modal.css"

export const Modal=()=>{

const [pinDetails,setPinDetails]=useState({
    title:"",
    description:"",
    img_blob:"",
    pin_size:"",

})

const save_pin=(pinDetails)=>{
   const user_data={
       ...pinDetails,
       title:document.querySelector("#pin_title").value,
       description:document.querySelector("#pin_description").value,
       
   }

   console.log(user_data)
}

const [showLabel,setShowLabel]=useState(true);
const [showModalPin,setShowModalPin]=useState(false)

    const upload_img=(event,pinDetails,setPinDetails,setShowLabel,setShowModalPin)=>{
        if(event.target.files && event.target.files[0]){
            if(/image\/*/.test(event.target.files[0].type)){
                const reader=new FileReader();
                 
                reader.onload=function(){
                    setPinDetails({
                        ...pinDetails,
                        img_blob:reader.result,
                    });

                    setShowLabel(false);
                    setShowModalPin(true);
                }
                reader.readAsDataURL(event.target.files[0])
            }
        }
}


const check_size=(event)=>{
    const image=event.target;

    image.classList.add("pin_max_width");

    if(image.getBoundingClientReact().width < image.parentElement.getBoundingClientReact().width || image.getBoundingClientReact().height < image.parentElement.getBoundingClientReact().height){
        image.classList.remove("pin_max_width");
        image.classList.add("pin_max_height");
    }

    image.style.opacity=1;
}

    return(
        <div className="add_pin_modal">
            <div className="add_pin_container">
                <div className="side" id="left_side">
                    <div className="section1">
                        <div className="pint_mock_icon_container">
                            <img src="https://media.istockphoto.com/vectors/typing-text-chat-isolated-vector-icon-modern-geometric-illustration-vector-id1186972006?k=20&m=1186972006&s=612x612&w=0&h=vFGrVHgdRGWyUlDcW5KPfAXy5sfcjLg5Cl231ZF78hM=" alt="edit" />
                        </div>
                    </div>
                    <div className="section2">
                          <label htmlFor="upload_img" id="upload_img_label"
                              style={{
                                  display: showLabel?"block":"none",

                              }}
                          >
                              <div className="upload_img_container">
                                  <div id="dotted_border">
                                      <div className="pint_mock_icon_container">
                                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Noun_project_Upload.svg/1200px-Noun_project_Upload.svg.png" alt="upload_img" className="pint_mock_icon" />
                                      </div>   
                                      <div>
                                          Click to upload
                                      </div>
                                      <div>
                                          Recommendation:use high-quality .jpg files smaller than 20 MB
                                      </div>
                                  </div>
                              </div>
                               <input onChange={event=>upload_img(event,pinDetails,setPinDetails,setShowLabel,setShowModalPin)} type="file" name="upload_img" id="upload_img" value=""/>
                              </label>

                              <div className="modals_pin"
                              style={{
                                  display:showModalPin?"block":"none",
                              }}
                              >
                                  <div className="pin_image">
                                     <img onload={check_size} src={pinDetails.img_blob} alt="pin_image" />
                                </div>
                              </div> 
                    </div>
                    <div className="section3">
                        <div className="save_from_site">Save from site</div>
                    </div>
                </div>


                <div className="side" id="right_side">
                    <div className="section1">
                       <div className="select_size">
                           <select defaultValue="Select" name="pin_size" id="pin_size">
                               <option value="">Select</option>
                               <option value="small">small</option>
                               <option value="small">small</option>
                               <option value="small">small</option>
                           </select>
                           <div onClick={()=>save_pin(pinDetails)} className="save_pin">Save</div>
                       </div>


                    </div>
                    <div className="section2">

                        <input placeholder="ADD YOUR TITLE" type="text" className="new_pin_input" id="pin_title" />
                        <input placeholder="Tell everyone what your Pin is about" type="text" className="new_pin_input" id="pin_description" />
                        <input placeholder="Add a destination link" type="text" className="new_pin_input" id="pin_destination" />

                    </div>
                </div>
            </div>
        </div>
    )
}