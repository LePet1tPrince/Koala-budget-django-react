import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function SidebarLink(props) {
    const {
        path,
        text,
        setActiveLink,
        icon
    } = props;

  return (
    <div>
        <Link to={path} className="rounded-3" activeClassLink="sidebarActive" onClick={setActiveLink}
        >
            <img src={icon} width="20px" className="ml-0 mr-2"/>
            {text}
            </Link>
    </div>
  )
}
