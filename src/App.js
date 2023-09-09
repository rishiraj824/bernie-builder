import { useEffect, useRef, useState } from 'react';
import './App.css';



function App() {
  const canvasRef = useRef();
  const [image, setImage] = useState('');
  const [value, setSearchValue] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const bernie = new Image();

  const search = (e) =>{ 
    if(e.keyCode === 13) {
      const image = new Image();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      image.onload = () => {
        // context.drawImage(image, 0, 0);
        
        const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
        console.log(scale);
        console.log(canvas.width, canvas.height);
        // get the top left position of the image
        const x = (canvas.width / 2) - (image.width / 2) * scale;
        const y = (canvas.height / 2) - (image.height / 2) * scale;
        context.drawImage(image, x, y, image.width * scale, image.height * scale);
        populateBernie();
      }

      image.src = e.target.value;
      setImage(e.target.value);
    }
  }
  const populateBernie = () => {

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    bernie.onload = () => {
      context.drawImage(bernie, 30, 90, 0, 60)
    }

    bernie.src = '/bernie.png';
  }
  // https://sportprosusa.com/wp-content/uploads/2014/06/SPU_8447-edited.jpg

  // const canvas = canvasRef.current;
  // const context = canvas.getContext("2d");

  // let currentX = canvas.width/2;
  // let currentY = canvas.height/2;
  // const _MouseEvents = () => {
  //     let isDraggable = false;
      
  //     canvas.onmousedown = (e) => {
    
  //       const mouseX = e.pageX - canvas.offsetLeft;
  //       const mouseY = e.pageY - canvas.offsetTop;    
    
  //       if (mouseX >= (currentX - bernie.width/2) &&
  //           mouseX <= (currentX + bernie.width/2) &&
  //           mouseY >= (currentY - bernie.height/2) &&
  //           mouseY <= (currentY + bernie.height/2)) {
  //         isDraggable = true;
  //         //currentX = mouseX;
  //         //currentY = mouseY;
  //       }
  //     };
  //     canvas.onmousemove = e => {
    
  //       if (isDraggable) {
  //         currentX = e.pageX - canvas.offsetLeft;
  //         currentY = e.pageY - canvas.offsetTop;
  //       }
  //     };
  //     canvas.onmouseup = e => {
  //       isDraggable = false;
  //     };
  //     canvas.onmouseout = e => {
  //       isDraggable = false;
  //     };
  // }
  // const _DrawImage = () => {
  //   context.drawImage(bernie, currentX-(bernie.width/2), currentY-(bernie.height/2));
  // }
  // const _ResetCanvas = () => {
  //   context.fillStyle = '#fff';
  //   context.fillRect(0,0, canvas.width, canvas.height);
  // }
  // const moveBernie = () => {
  //   // setInterval(function() {
  //   //   _ResetCanvas();
  //   //   _DrawImage();
  //   // }, 1000/30);
  // }
  const downloadImage = () => {

  }

  useEffect(() => {
    populateBernie();
    // _MouseEvents();
    // moveBernie();
  }, [canvasRef])
  return (
    <div className="App">
      <header className="App-header">
        
        <label>Background (URL or Search Term):</label> 
        <input type="text" value={value} onChange={(e)=>setSearchValue(e.target.value)} onKeyDown={search}/>
        <br/>
        <label>Top Text:</label>
        <input type="text" value={topText} onChange={(e)=>setTopText(e.target.value)} onKeyDown={search} />
        <br/>
        <label>Bottom Text:</label>
        <input type="text" value={bottomText} onChange={(e)=>setBottomText(e.target.value)} onKeyDown={search} />
        <br/>
        <button onClick={downloadImage}>Download</button>
        <br/>
        <canvas ref={canvasRef} width="100%" height="70%" className="canvas"/>
      </header>
    </div>
  );
}

export default App;
