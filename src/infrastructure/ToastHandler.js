import React from "react";
import $ from 'jquery';
import { IoAlertCircleSharp } from 'react-icons/io5';

export class ToastHandler{
    remove(time=null){
        const toast = $('body').find('div[data-toast]');
        if (time === null) $(toast).remove();
        else setInterval(() => $(toast).remove(), time);
    }

    custom(message, color){
        this.remove();
        $('<div data-toast-close />').text('X').addClass('float-end text-light pointer')
        .on('click', (e)=>$(e.target).parent().remove())
        .appendTo(
            $('<div data-toast />')
            .addClass(`toast position-absolute bottom-0 start-0 p-3 ms-4 mb-5 rounded text-nowrap d-flex shadow-lg ${color}`)
            .append($('<div/>').text(message).addClass('w-100 text-truncate')).appendTo(document.body)
        );
        this.remove(5000);
    }

    error(message){
        this.custom(message, 'text-danger');
        return 'error';
    }
    
    success(message){
        this.custom(message, 'text-success');
        return 'success';
    }
    
    warning(message){
        this.custom(message, 'text-warning');
        return 'Warning';
    }
}