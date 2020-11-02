import React from "react";
function BoardMemberCard (props) {
    return (<div className="card carousel-item">
    <div className="card-image ">
        <img className="responsive-img" src={props.image}/>
        <span className="card-title">{props.name}</span>
    </div>

    <div className="card-content">
    <h4>{props.position}</h4>
        
        <br/>
        <p className="board-profile-icons-container">
            <span className="board-profile-icon">
                <a href={props.social_media_urls.linkedin} ><i className="fab fa-2x fa-linkedin"></i></a>
            </span>
            <span className="board-profile-icon">
                <a href={props.social_media_urls.github} ><i className="fab fa-2x fa-github"> </i></a>
            </span>
            <span className="board-profile-icon">
                <a href={props.social_media_urls.github} ><i className="fab fa-2x fa-medium"></i></a>
            </span>
        </p>
    </div>
</div>);
}

export default BoardMemberCard;