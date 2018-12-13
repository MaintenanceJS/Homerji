import React from "react"

const HomeLinks=()=>{
 console.log("renderin home")
   return(
<div style={{ cursor: "auto" }}>

         <div id="logos" style={{ maxWidth: "1200px", margin: "auto", padding: "10px" }}>
           <div className="container" style={{ marginTop: "40px" }}>
           <center>
             <div className="row" style={{ marginTop: "20px"}}>
             <div className="col-md-6 col-md-offset-3">


                <a href="electric"> <div className="col-md-4">
                   <div className="col-lg-10 feature-box">
                     <span className="yellow glyphicon glyphicon-flash icon" />
                     <h4>Electricians</h4>
                   </div>
                 </div></a>


                 <a href="paintinig">
               <div style={{ textDecoration: "none" }} >
                 <div className="col-md-4">
                   <div className="col-md-10 feature-box">
                     <span className=" glyphicon glyphicon-picture icon"/>
                     <h4>Painting</h4>
                   </div>
                 </div>
           </div>
           </a>

           <a href="plumbers">
            <div style={{ textDecoration: "none" }} to="/Plumb">
                 <div className="col-md-4">
                   <div className="col-md-10 feature-box">
                     <span className="glyphicon glyphicon-tint icon" />
                     <h4>Plumbers</h4>
                   </div>
                 </div>
               </div>
               </a>
               </div>
               </div>
               </center>
               <center>
               <div className="row" style={{ marginTop: "20px" }}>
               <div className="col-md-6 col-md-offset-3">
            <a href ="carpenters">
               <div style={{ textDecoration: "none" }} to="/Carpenter">
                 <div className="col-md-4">
                   <div className="col-md-10 feature-box">
                     <span className="glyphicon glyphicon-tree-conifer icon" />

                     <h4>Carpenters</h4>
                   </div>
                 </div>
               </div></a>

               <a href ="gardens">
               <div style={{ textDecoration: "none" }} to="/Gardener">
                 <div className="col-md-4">
                   <div className="col-md-10 feature-box">
                     <span className="green glyphicon glyphicon-leaf icon" />
                     <h4>Gardeners</h4>
                   </div>
                 </div>
               </div>
               </a>

               <a href ="furniture">
               <div style={{ textDecoration: "none" }} to="/Furniture">
                 <div className="col-md-4">
                   <div className="col-md-10 feature-box">
                     <span className="glyphicon glyphicon-lamp icon" />
                     <h4>Furniture Services</h4>
                   </div>
                 </div>
               </div>
               </a>
               </div>
             </div>
             </center>
           </div>

         </div>

         </div>
   )


}
export default HomeLinks