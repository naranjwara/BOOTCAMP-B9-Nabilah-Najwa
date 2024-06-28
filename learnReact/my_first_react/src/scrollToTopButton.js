import React, { Component } from "react";

class scrollToTopButton extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', 
        });
    }

    render(){
        return(
            <div className="scroll-to-top">
                <button onClick={this.scrollToTop} ref={this.buttonRef}>Scroll to top</button>
            </div>
        )
    }
}

export default  scrollToTopButton;