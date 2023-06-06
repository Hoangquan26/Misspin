import React from 'react';

const MessageItem = ({content, type, byMe}) => {
    return (
        <div className={` flex ${type == 'notify' ? 'justify-center' : ''}`}>
            {type != 'notify' ? <div className={`${byMe ? ' grow' : ''}`}></div> : ''}
            <div 
            className={` ${type == 'notify' ? '' : byMe ? ' rounded-tr-sm self-end bg-[#b785f5]' : ' rounded-tl-sm bg-[#16171b]'} rounded-xl max-w-[55%] 
            ${type == 'text' ? ' p-4' : ''}`}>
                {
                    type == 'text' || type == 'notify' ?
                    <p className={`${type == 'notify' ? 'text-xs text-gray-400' : 'text-sm'} `}>{content}</p> :
                    <img src={content}></img>
                }
            </div>
        </div>
    );
};

export default MessageItem;