import React from 'react';
import './App.scss';
import Gameboy from '../Gameboy/Gameboy';
import RomLoader from '../RomLoader/RomLoader';

class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <RomLoader />
                <Gameboy />
            </div>
        );
    }
}

// const Multitouch = (props: MultitouchProps) => {
//     return (
//         <div
//             id={props.id}
//             className='touch-none'
//             onTouchStart={
//                 (e) => {
//                     e.preventDefault();
//                     updateBackground(e);
//                 }
//             }
//             onTouchCancel={
//                 (e: any) => {
//                     e.preventDefault();
//                     if (e.targetTouches.length === 0) {
//                         // Restore background and border to original values
//                         e.target.style.background = "white";
//                         e.target.style.border = "1px solid black";
//                     }
//                 }
//             }
//             onTouchEnd={
//                 (e: any) => {
//                     e.preventDefault();
//                     if (e.targetTouches.length === 0) {
//                         // Restore background and border to original values
//                         e.target.style.background = "white";
//                         e.target.style.border = "1px solid black";
//                     }
//                 }
//             }
//         >
//             {props.text}
//         </div>
//     );
// };

// const updateBackground = (ev: any) => {
//     // Change background color based on the number simultaneous touches
//     // in the event's targetTouches list:
//     //   yellow - one tap (or hold)
//     //   pink - two taps
//     //   lightblue - more than two taps
//     switch (ev.targetTouches.length) {
//       case 1:
//         // Single tap`
//         ev.target.style.background = "yellow";
//         break;
//       case 2:
//         // Two simultaneous touches
//         ev.target.style.background = "pink";
//         break;
//       default:
//         // More than two simultaneous touches
//         ev.target.style.background = "lightblue";
//     }
// }

// interface MultitouchProps {
//     id: string,
//     text: string
// };

export default App;
