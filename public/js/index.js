import * as constants from "../../Encryption JS/constants/index.js";
import { displayMenu,displayBreadcrumb } from "./UIDisplayMain.js";
import { filterArr } from "./commons.js";
import { displayHillKey,displayHillKeyInput } from "./hillDisplay.js";
import { displaySubtitule } from "./subtituteDisplay.js";
import { encryptPlaintext,decryptCyphertext } from "./encrypt.js";
import { displayAffine } from "./affineDisplay.js"
import { displayVigenere } from "./vigenereDisplay.js";
import { displayCeasar } from "./ceasarDisplay.js";
import {check as CheckKeyAffine } from "../../Encryption JS/affine-cipher.js";
const menulist = document.querySelector('#menu-list');
const breadcrumbMenu = document.querySelector('#breadcrumb-menu');
const plainText = document.querySelector('#plain-text');
const cipherText = document.querySelector('#cipher-text');
const keyContentEncrypt = document.querySelector('#key-content-encrypt');
const keyContentDecrypt = document.querySelector('#key-content-decrypt');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryEncrypt = urlParams.get('q');
const objEncrypt = filterArr(constants.encryptionArr,queryEncrypt);
const title = document.querySelector('title');

//--------------------Event--------------------------------
$(function () {
    $(document).on('click', '#hillSelect-encrypt', function (e) {
        const hillMatrix = document.querySelector('#hillMatrix-encrypt');
        hillMatrix.innerHTML = '';
        hillMatrix.insertAdjacentHTML('afterbegin', displayHillKeyInput('encrypt', e.target.value));
    })
    $(document).on('click', '#hillSelect-decrypt', function (e) {
        const hillMatrix = document.querySelector('#hillMatrix-decrypt');
        hillMatrix.innerHTML = '';
        hillMatrix.insertAdjacentHTML('afterbegin', displayHillKeyInput('decrypt', e.target.value));
    })
    $(document).on('click', '#encrypt-btn', function (e) {
        var key = null;
        var flag = true;
        var msg = null;
        switch(objEncrypt.slug){
            case 'hill-cipher' : {
                const hillMatrixInput = document.querySelectorAll('.hillMatrixInput-encrypt');
                const direction = Math.sqrt(hillMatrixInput.length);
                let count = 0;
                key = new Array(direction);

                for(let i = 0; i < direction; i++){
                    key[i] = [];
                    for(let j = 0; j < direction; j++){
                        if(!hillMatrixInput[count].value){
                            msg = 'Nhập đủ ma trận!!';
                            flag = false;
                        }
                        key[i].push(hillMatrixInput[count].value);
                        count++;
                    }
                }
                break;
            }
            case 'affine-cipher':{
                const affineInput = document.querySelectorAll('.affinekey-encrypt');
                key = [];
                for(let i=0;i<2;i++){
                    if(!affineInput[i].value){
                        msg = "Nhập đủ 2 số";
                        flag = false;
                    }
                    key.push(affineInput[i].value);

                }
                if(!CheckKeyAffine(key[0])){
                    msg = "Key sai rui"
                    flag = false;
                }
                break;
            }
            case 'subtitute-cipher' : {
                const subInput = document.querySelector('#subtituteInput-encrypt');
                key = subInput.value;
                break;
            }
            case 'vigenere-cipher' : {
                const vigeInput = document.querySelector('.vigenerekey-encrypt');
                key = vigeInput.value;
                break;
            }
            case 'ceasar-cipher' : {
                const ceasarInput = document.querySelector('#ceasarInput-encrypt');
                key = ceasarInput.value;
                break;
            }
        } 

        //Neu flag = true chạy hàm encrypt
        if(flag){
            encryptPlaintext(objEncrypt.slug,plainText.value,key);
        }
        else {
            alert(msg);
        }
        
    })
    $(document).on('click', '#decrypt-btn', function (e) {
        var key = null;
        var flag = true;

        switch(objEncrypt.slug){
            case 'hill-cipher' : {
                const hillMatrixInput = document.querySelectorAll('.hillMatrixInput-decrypt');
                const direction = Math.sqrt(hillMatrixInput.length);
                let count = 0;
                key = new Array(direction);
                for(let i = 0; i < direction; i++){
                    key[i] = [];
                    for(let j = 0; j < direction; j++){
                        if(!hillMatrixInput[count].value){
                            flag = false;
                            msg = 'Nhập đủ ma trận!!';
                        }
                        key[i].push(hillMatrixInput[count].value);
                        count++;
                    }
                }
                break;
            }

            case 'affine-cipher':{
                const affineInput = document.querySelectorAll('.affinekey-decrypt');
                key = [];
                for(let i=0;i<2;i++){
                    if(!affineInput[i].value){
                        msg = "Nhập đủ 2 số";
                        flag = false;
                    }
                    key.push(affineInput[i].value);
                }
                if(!CheckKeyAffine(key[0])){
                    msg = "Key sai rui"
                    flag = false;
                }
                break;
            }

            case 'subtitute-cipher' : {
                const subInput = document.querySelector('#subtituteInput-decrypt');
                key = subInput.value;
                break;  
            }
            case 'vigenere-cipher' : {
                const vigeInput = document.querySelector('.vigenerekey-decrypt');
                key = vigeInput.value;
                break;
            }
            case 'ceasar-cipher' : {
                const ceasarInput = document.querySelector('#ceasarInput-decrypt');
                key = ceasarInput.value;
                break;
            }
        }

        //Neu flag = true chạy hàm decrypt
        if(flag){
            decryptCyphertext(objEncrypt.slug,cipherText.value,key);
        }
        else {
            alert(msg);
        }
    })
})


//--------------------Display UI--------------------------------
//Menu
menulist.insertAdjacentHTML('afterbegin', displayMenu(constants.encryptionArr));

//Breadcrumb
breadcrumbMenu.insertAdjacentHTML('afterbegin',displayBreadcrumb(objEncrypt));

//Key content
switch(objEncrypt.slug){
    case 'hill-cipher' : {
        keyContentEncrypt.insertAdjacentHTML('afterbegin',displayHillKey('encrypt'));
        keyContentDecrypt.insertAdjacentHTML('afterbegin',displayHillKey('decrypt'));
        break;
    }
    case 'affine-cipher' : {
        keyContentEncrypt.insertAdjacentHTML('afterbegin',displayAffine('encrypt'));
        keyContentDecrypt.insertAdjacentHTML('afterbegin',displayAffine('decrypt'));
        break;
    }

    case 'ceasar-cipher' : {
        keyContentEncrypt.insertAdjacentHTML('afterbegin',displayCeasar('encrypt'));
        keyContentDecrypt.insertAdjacentHTML('afterbegin',displayCeasar('decrypt'));
        break;
    }

    case 'subtitute-cipher' : {
        keyContentEncrypt.insertAdjacentHTML('afterbegin',displaySubtitule('encrypt'));
        keyContentDecrypt.insertAdjacentHTML('afterbegin',displaySubtitule('decrypt'));
        break;
    }

    case 'vigenere-cipher' : {
        keyContentEncrypt.insertAdjacentHTML('afterbegin',displayVigenere('encrypt'));
        keyContentDecrypt.insertAdjacentHTML('afterbegin',displayVigenere('decrypt'));
        break;
    }
}

//Title
title.innerHTML = objEncrypt.name + ' - Decoder, Encoder';