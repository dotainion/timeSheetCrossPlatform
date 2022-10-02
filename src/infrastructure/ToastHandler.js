import React from "react";
import $ from 'jquery';

export class ToastHandler{
    remove(time=null){
        const toast = $('body').find('div[class=toast]');
        if (time == null){
            $(toast).remove();
        }else{
            $(toast).show('fast');
            setInterval(() => {
                $(toast).hide('fast');
                setInterval(() => $(toast).remove(), 1000);
            }, time);
        }
    }

    custom(message, color){
        this.remove();
        $('<div/>')
            .text('X')
            .click((e)=>{
                $(e.target).parent().hide('fast');
                setInterval(() => $(e.target).parent().remove(), 1000);
            })
            .appendTo(
                $('<div/>')
                    .css({
                        backgroundColor: color, 
                        display: 'none'
                    })
                    .addClass('toast')
                    .text(message)
                    .appendTo(document.body)
        );
        this.remove(5000);
    }

    error(message){
        this.custom(message, 'rgb(255, 0, 0, 0.90)');
        return 'error';
    }
    
    success(message){
        this.custom(message, 'rgb(0, 128, 0, 0.90)');
        return 'success';
    }
    
    warning(message){
        this.custom(message, 'rgb(255, 165, 0, 0.90)');
        return 'Warning';
    }
}