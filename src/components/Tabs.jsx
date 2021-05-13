import React,{ Component} from "react";
import "../App.css";
import Tab1 from "./Tab1/Tab1";
import Tab2 from "./Tab2/Tab2";
import Tab3 from "./Tab3/Tab3";
import share_img from "../assets/share.png"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



class Tabs extends Component{

  constructor(props){
    super(props);
    this.state={
      toggleState:1,
      data_val: localStorage.getItem('data_val') ?
        JSON.parse(localStorage.getItem('data_val')):{
        labels: ['car', 'bus', 'truck', 'bike', 'bicycle'],
        data: [65, 59, 80, 81, 56]
      },
      pdfBase64:null,
    }
  }

  toggleTab = (index) => {
    this.setState({
      toggleState:index,
    })
  };

  share = () => {
    if(this.state.pdfBase64!==null){
      this.send_mail(this.state.pdfBase64);
    }else{
      this.generatePdf(2);
    }
  }

  send_mail = (pdfBase64) => {
    console.log(pdfBase64.length);
    this.setState({
      pdfBase64:pdfBase64
    });
    this.toggleTab(4);
  }

  call_second=(pdf,flag)=>{
    html2canvas(document.getElementById('tab2_data'))
      .then((canvas) => {
        pdf.addPage({
          orientation: "landscape",
          unit: "in",
          format: [20, 10]
        })
        pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 2, 1);
        this.toggleTab(3);
        setTimeout(()=>{
          this.call_third(pdf,flag);
        }, 2000);
      });
  }

  call_third=(pdf,flag)=>{
    html2canvas(document.getElementById('tab3_data'))
      .then((canvas) => {
        // pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 2, 1);
        pdf.addPage({
          orientation: "landscape",
          unit: "in",
          format: [20, 10]
        })
        pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 2, 1);
        document.getElementById('processing').style.display = "none";
        if(flag===2){
          const pdfBase64=pdf.output('datauristring')
          this.send_mail(pdfBase64);
        }
        if(flag===1){
          setTimeout(() => {
            this.setState({
              pdfBase64: pdf.output('datauristring')
            })
            pdf.save('report.pdf');
          }, 1000)
        }
      });
  }

  generatePdf = (flag) => {
    document.getElementById('processing').style.display="block";
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [20, 10]
    });
    this.toggleTab(1);
    setTimeout(()=>{
      html2canvas(document.getElementById('tab1_data'))
        .then((canvas) => {
          pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 2, 1);
          this.toggleTab(2);
          setTimeout(() => {
            this.call_second(pdf,flag);
          }, 2000);
        });
    }, 2000)
  }

  set_data_to_graph = () => {
    var label_str=document.getElementById("inp_labels").value;
    var quantity_str=document.getElementById("inp_quantity").value;
    var label_arr=label_str.split(",");
    var quantity_arr = quantity_str.split(",").map((i) => Number(i));
    label_arr.length !== quantity_arr.length ? window.location.reload():
    localStorage.setItem('data_val', JSON.stringify({
      labels: label_arr,
      data: quantity_arr
    }));
    this.setState({
      data_val: {
        labels: label_arr,
        data: quantity_arr
      }
    }, () => {
      console.log(this.state.data_val);
      window.location.reload();
    });
  }

  render(){
  return (
    <div className="container">
      <div className="head_data">Analysis - Tab {this.state.toggleState}</div>
      <div className="bloc-tabs">
        <button
          className={this.state.toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => this.toggleTab(1)}
        >
          Tab 1
        </button>
        <button
          className={this.state.toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => this.toggleTab(2)}
        >
          Tab 2
        </button>
        <button
          className={this.state.toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => this.toggleTab(3)}
        >
          Tab 3
        </button>
      </div>
      <div style={{fontSize:'25px',display:'none'}} id="processing">Processing...</div>
      <div className="btn_con">
        <img src={share_img} onClick={()=>this.share()} alt="share" className="share_img"/>
        <button onClick={()=>this.generatePdf(1)} className="print_btn">GENERATE PDF</button>
        <button onClick={() => this.toggleTab(5)} className="print_btn">SET MY OWN DATA</button>
      </div>
      <div className="content-tabs">
        <div
          className={this.state.toggleState === 1 ? "content  active-content" : "content"}
        >
          <div id="tab1_data">
          <Tab1 data_val={this.state.data_val}/>
          </div>
        </div>

        <div
          className={this.state.toggleState === 2 ? "content  active-content" : "content"}
        >
          <div id="tab2_data">
          <Tab2 data_val={this.state.data_val}/>
          </div>
        </div>

        <div
          className={this.state.toggleState === 3 ? "content  active-content" : "content"}
        >
          <div id="tab3_data">
          <Tab3 data_val={this.state.data_val}/>
          </div>
        </div>
        <div
          className={this.state.toggleState === 4 ? "content  active-content" : "content"}
        >
          <div className='form-div'>
          <form action='sendmail' method='post' enctype="multipart/form-data">
            <div className="container">
              <label>Email of recipient : </label>
              <input type="text" placeholder="Enter email" name="to_mail" required />
              <label>Name of recipient : </label>
              <input type="text" placeholder="Enter name" name="name_to" required />
              <input type="text" name="pdfBase64" value={this.state.pdfBase64} style={{display:'none'}}/>
              <button type="submit" className='btn-sign'>Send</button>
            </div>
          </form>
          </div>
        </div>

        <div
          className={this.state.toggleState === 5 ? "content  active-content" : "content"}
        >
        <div className='form-div'>
            <div className="container">
              <label>Enter labels comma separated like(car,truck,bus)</label>
              <input type="text" placeholder="car,truck,bus" id="inp_labels"/>
              <label>Enter quantity comma separated like(50,60,40)</label>
              <input type="text" placeholder="50,60,40" id="inp_quantity"/>
              <input type="text" name="pdfBase64" value={this.state.pdfBase64} style={{ display: 'none' }} />
              <button className='btn-sign' onClick={()=>this.set_data_to_graph()}>Set Data</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
  }
}

export default Tabs;