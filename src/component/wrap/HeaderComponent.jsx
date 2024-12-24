import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HeaderComponent() {

    const [state, setState] = useState({
        메인메뉴: {}
    })
    const [sub, setSub] = React.useState(Array(4).fill(false));


    // 네비게이션 가져오기
    useEffect(()=>{
        axios({
            url:'./json/nav.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                메인메뉴: res.data.네비게이션.메인메뉴
            })
        })
        .catch((err)=>{
            console.log( 'axios REST API 실패' );
            console.log( err );
        });
    }, []);
    
    const onMouseEnterMainBtn=(e, number)=>{
        let imsi = Array(4).fill(false);
        imsi[number] = true;
        setSub(imsi);       
    }

    const onMouseLeaveMainBtn=()=>{
        const imsi = Array(4).fill(false);
        setSub(imsi);
    }


    return (
        <header id="header" className="">
            <div className="row1">
                <h1><a href="./" title="푸른마을"><span>푸른</span><em>마을</em></a></h1>
                <div className="mobile-bnt-box">
                    <a href="!#" className="mobile-bnt">
                        <i className="line line1"></i>
                        <i className="line line2"></i>
                        <i className="line line3"></i>
                    </a>
                </div>
            </div>
            <div className="row2">
                <nav id="nav">
                    <ul onMouseLeave={onMouseLeaveMainBtn}>
                       { 
                        // ['메인메뉴1', '메인메뉴2', '메인메뉴3', '메인메뉴4'].map()
                            Object.keys(state.메인메뉴).map((item, idx)=>                                                            
                                <li key={item}>
                                    <a href="!#" className="main-btn" title="OnSale"  onMouseEnter={(e)=>onMouseEnterMainBtn(e, idx)} >{item}</a>
                                    {
                                        sub[idx] &&     
                                        <div className="sub sub1">
                                            <ul>
                                               {
                                                state.메인메뉴[item].map((item2, idx2)=>
                                                    <li key={idx2}> {/*  줄 */}
                                                    {               
                                                        item2.map((item3, idx3)=>
                                                            <span key={idx3}> {/*  칸 */}
                                                                <a href="!#">{item3}</a>
                                                            </span>   
                                                        )
                                                    }
                                                    </li>
                                                )     
                                               }
                                            </ul>
                                        </div>
                                    }
                                </li>                               
                            )                        
                       }
                    </ul>
                </nav>
            </div>
        </header>
    );
}