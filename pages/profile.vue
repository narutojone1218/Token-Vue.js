<template>
	<div class="profile-page">	
        <div class="left-sidebar">
            <profile-avatar
                @vue-avatar-editor:image-ready="onImageReady"
                image="https://images.cryptocompare.com/301942/d100fe20-b892-4867-b437-e97ea3b0fa11.jpg">
            </profile-avatar>

            <div class="profile-actions">
                 <div class="mobile-name"><h1>{{mappedUserData.uid}}</h1></div>
                 <button class="follow-button"> <span class="fa fa-plus"></span> <strong>&nbsp;Follow</strong> </button>  
            </div>

            <div class="well well-sm profile-fields">
                <div class="destkop-profile-fields">
                    <div class="label-profile">
                            Points
                    </div>
                    <div class="profile-field">
                        <div class="value-profile" tooltip-placement="top" tooltip-trigger="mouseenter">170</div>
                    </div>

                    <div class="label-profile">
                            Followers
                    </div>
                    <div class="profile-field">
                        <div class="value-profile" tooltip-placement="top" tooltip-trigger="mouseenter">0</div>
                    </div>

                    <div class="label-profile">
                            Comments
                    </div>
                    <div class="profile-field">
                        <div class="value-profile" tooltip-placement="top" tooltip-trigger="mouseenter">0</div>
                    </div>

                    <div class="label-profile">
                            Views
                    </div>
                    <div class="profile-field">
                        <div class="value-profile" tooltip-placement="top" tooltip-trigger="mouseenter">22</div>
                    </div>
                </div>

                <div class="mobile-profile-fields">
                    <no-ssr>
                        <table>
                            <thead>
                                <td>POINTS</td><td>FOLLOWERS</td><td>COMMENTS</td><td>VIEWS</td>
                            </thead>
                            <tbody>
                                <td>170</td><td>0</td><td>0</td><td>22</td>
                            </tbody>
                        </table>
                    </no-ssr>
                </div>
            </div>
        </div>

        <div class="right-sidebar">
            <div class="main">
                <div class="user-info">
                    <div class="desktop-name"><h1>{{convertName(mappedUserData.uid)}}</h1></div>

                    <div class="profile-comment">
                        <span style="padding-left:20px;">Token Recap Profile Page</span>
                    </div>
                </div>
                <div class="card">
                    <b-tabs ref="tabs" card>
                        <b-tab title="Activity" active>
                           <div class="div-tab">
                                {{ getUserReviews(mappedUserData.uid) }}
                                {{ getReply() }}
                                <fade-loader v-show="loading" class="spinner"></fade-loader>
                                <div style="padding-bottom:20px;" v-show="!loading" v-for="data in reviewData">
                                <div class="div-activity">
                                    <div class="activity-node activity-node-following">
                                        <a href=""><span class="fa fa-star"></span></a>	
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-text">
                                            <span class="entry-time">
                                                <span class="fa fa-clock-o">                                                    
                                                </span>
                                                <timeago style="margin-left:3px;" :since="data.post_time"></timeago>
                                            </span>

                                            <span class="user_name"><a href="#">{{mappedUserData.uid}}</a></span>

                                            <span>reviewed the</span>

                                            <span class="coin-avatar">
                                                <img style="width:25px; height:25px;" :src="mappedGetCoinInfo[data.coinName].image_url" />
                                            </span>
                                            <a href="#">{{data.symbolName}}</a>
                                            <span class="coin-forum">exchange</span>
                                        </div>
                                    </div>                               
                                </div>
                                <div class="content-body">
                                    <div class="image-photo">
                                        <a><img style="width:60px; height:60px;" :src="mappedGetCoinInfo[data.coinName].image_url" /></a>
                                    </div>
                                    <div class="div-review">
                                        <div>
                                            <span>{{data.symbolName}}</span>
                                        </div>
                                        <div class="review-rating">
                                            <star-rating :rating="data.review.rating"></star-rating>
                                        </div>
                                        <div class="review-comment">
                                            <span>{{data.review.comments}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="reply-body">
                                   
                                    <div class="reply" style="flex:1">
                                        <a class="btn btn-replies" @click="toggleReplyVisibility(data.coinName, 'blah blah blah blah')">
                                            <i class="fa fa-reply"></i>
                                            <span style="margin-left:5px;">
                                                {{getReplyData[data.coinName][mappedUserData.uid].replies ? Object.keys(getReplyData[data.coinName][mappedUserData.uid].replies).length + ' Replies' : 'You did not reply yet'}}                                                
                                            </span>
                                        </a>
                                    </div>

                                     <div class="reply" style="display:flex;justify-content:flex-end">
                                        <a class="btn btn-replies" @click="likeReview(data.coinName, mappedUserData.uid)">
                                            <span class="btn-agree"><i class="fa fa-thumbs-o-up"></i></span>
                                            <span class="action-text">Agree</span>                                           
                                        </a>
                                        <a class="action-counter counter-agree">{{numLikes(getReplyData[data.coinName][mappedUserData.uid])}}</a>
                                    </div>

                                    <div class="reply btn-disagree" style="display:flex;justify-content:flex-end">
                                        <a class="btn btn-replies" @click="dislikeReview(data.coinName, mappedUserData.uid)">
                                            <i class="fa fa-thumbs-o-down"></i>                                          
                                        </a>
                                        <a class="action-counter counter-disagree">
                                            {{numDislikes(getReplyData[data.coinName][mappedUserData.uid])}}
                                        </a>
                                    </div>

                                    </div>

                                    <div class="reply-body">
                                
                                    <div class="write-reply" v-if="visibleReplies[data.coinName]">
                                        <div v-if="getReplyData[data.coinName][mappedUserData.uid].replies">
                                        <div class="user-replies" v-for="id in Object.keys(getReplyData[data.coinName][mappedUserData.uid].replies)">
                                            <div class="reply-data">                                               
                                                {{getReplyData[data.coinName][mappedUserData.uid].replies[id].body}}
                                            </div>
                                            
                                        </div>
                                        </div>
                                        <div>
                                            <b-form-textarea id="textarea2"
                                                v-model="replyBody[mappedUserData.uid]"
                                                :placeholder="'Write Reply'"
                                                :rows="3"
                                                :max-rows="3" class="mt-3">
                                            </b-form-textarea>
                                        </div>
                                        <div style="float:right;position:relative;top:-36px;">
                                             <b-button variant="primary" @click="replyReview(data.coinName, mappedUserData.uid, replyBody[mappedUserData.uid])">Submit</b-button>
                                             <!-- <b-button variant="primary" @click="$modal.show('warn-modal')">Submit</b-button> -->
                                        </div>
                                    </div>                                    
                               </div>
                               
                             </div>                                                   
                           </div>
                        </b-tab>
                        <b-tab title="Reviews">
                            <div class="div-tab">
                                {{ getUserReviews(mappedUserData.uid) }}  
                                <fade-loader v-show="loading" class="spinner"></fade-loader>
                         
                                <div class="div-activity" v-show="!loading" v-for="data in reviewData">
                                    <div class="activity-node activity-node-following">
                                        <a href=""><span class="fa fa-comment"></span></a>	
                                    </div>
                                    <div class="activity-content">
                                        <div class="activity-text">
                                            <span class="entry-time">
                                                <span class="fa fa-clock-o">
                                                    {{(Math.round(Number(new Date().getTime()-data.post_time)/3600000))}} Hours ago
                                                </span>
                                            </span>

                                            <span class="user_name"><a href="#">{{mappedUserData.uid}}</a></span>

                                            <span>reviewed in the</span>

                                            <span class="coin-avatar">
                                                <img style="width:25px; height:25px;" :src="mappedGetCoinInfo[data.coinName].image_url" />                                                
                                            </span>
                                            <a href="#">{{data.symbolName}}</a>
                                            <span class="coin-forum">coin forum</span>
                                        </div>
                                    </div>
                                    <!-- {{reviewData}} -->
                                </div>

                                <div class="content-body">
                                    
                                </div>
                           </div>
                        </b-tab>
                        <b-tab title="Following">
                        </b-tab>
                        <b-tab title="FollowersF">
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <modal name="warn-modal" ref="warnModal" height="auto" width="600px">
            <div class="modal-header">
                <h3>This comment appears to be blank...</h3>
            </div>
            <div class="modal-body">
                <div>
                    <span class="fa fa-warning"></span>
                </div>
                <div style="margin-left:40px;">
                    <span>                
                        It seems that you are trying to add an empty reply. Please write something and try to add the reply again.
                    </span>
                </div>       
            </div>
            <div class="modal-footer">              
                <button class="btn btn-info" @click="closeModal()"><i class="fa fa-times"></i> Close</button>
            </div>
        </modal>
	</div>
</template>

<script>

import Vue from 'vue'
import { mapGetters } from 'vuex'

import StarRating from '~/components/StarReview.vue'
import ProfileAvatar from '~/components/ProfileAvatar.vue'
import FadeLoader from '~/components/fadeloader.vue'
import WarnDialog from '~/components/dialog/WarnDialog.vue'
import VueTimeago from 'vue-timeago'

const Avatar = require('vue-avatar');

var dateFormat = require('dateformat');

Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

export default {
	components: {
        FadeLoader,
        StarRating,
        ProfileAvatar,
        WarnDialog
    },

    data: function() {
        return {
            loading: true,
            reviewData: {},
            visibleReplies: {},
            replyBody: {},
            getReplyData: {}
        }
    },
    
	mounted() {
		
	},
	methods: {

       convertName(name) {
            // return "a" + name.toString();
            return name;
       },

       getImageUrl(sym) {

           return "http://cryptosumup.com/images/" + sym.toLowerCase() + ".png";
       },

       getReplyCount(data) {

       },
       
       onImageReady(scale){
          alert("clicked");
          this.$refs.vueavatarscale.setScale(scale);
       },     

       getUserReviews(uid) {
            // this.loading = true;      
            this.$firebase.database().ref('userCoinReviews/'+uid).once('value')
                .then(snap => {
                    this.loading = false;
                    this.reviewData = snap.val();
                })
                .catch(err => {
                    this.loading = false;
                    return;
                });  
        },

        checkReply() {
            this.reply = !this.reply;
        },

        closeModal() {
            this.$refs.warnModal.visible = false;
        },
        
        replyReview(coinName, reviewId, replyBody) {

            if(!replyBody)
                this.$refs.warnModal.visible = true;
            else            
			    this.$store.dispatch('coinReviews/replyReview', { coinName, reviewId, replyBody })
        },

        getReply () {          
            this.$firebase.database().ref(`coinReviews`).once('value')
            .then(snap => {                         
                    this.getReplyData = snap.val();
                })
                .catch(err => {
            });   
        },

		toggleReplyVisibility(reviewId) {
			Vue.set(this.visibleReplies, reviewId, !this.visibleReplies[reviewId]);
		},
		likeReview(coinName, reviewId) {
			this.$store.dispatch('coinReviews/rateReview', { coinName: coinName, reviewId, like: true })
		},
		dislikeReview(coinName, reviewId) {
			this.$store.dispatch('coinReviews/rateReview', { coinName: coinName, reviewId, like: false })
		}
    },
    
    mounted() {              
    }, 

    props: {        
    },

	computed: {

        numLikes() {
			return (review) => {
				if(!review || !review.likes) return 0;

				return Object.keys(review.likes).length;
			}
        },

        numDislikes() {
			return (review) => {
				if(!review || !review.dislikes) return 0;

				return Object.keys(review.dislikes).length;
			}
		},
        
        mappedUserData() {
            return this.getUser;
        },

        mappedUserEmail() {            
            
            return this.getUserEmail;
        },

        mappedUserPassword() {
            return this.getUserPassword;
        },

        mappedGetCoinInfo(coinName) {
            return this.getCoinInfo;
        },

        mappedGetUserCoinReplies (coinName, reviewId) {
            return this.getUserCoinReplies;
        },

        ...mapGetters(
			{				
                getUser: 'user/getUser',
                getUserEmail: 'user/getUserEmail',
                getUserPassword: 'user/getUserPassword',
                getCoinInfo: 'coinInfos/getCoinInfosByName',
                getUserCoinReplies: 'coinReviews/getCoinReviews'
			}
		)
    }
}
</script>

<style>

    .modal-header {
        background: #ffaa00;
        color: #fff;
        padding: 15px;
        border-bottom: 1px solid #c0830a;
        border-radius: 4px 4px 0 0;
    }

    .modal-body {
        display: flex;
    }

    .modal-header h3 {
        color: #fff;
        text-shadow: 1px 2px 3px rgba(0,0,0,.2);
    }

    .modal-footer {
        /* background: #f5f5f5; */
    }

    .modal-body .fa {
       
        background: #ED402A;
        color: #fff;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        font-size: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        display: flex
    }

    .modal-body .fa::before {
        margin-left: 10px;
    }

    .action-counter {
        background: #fff;
        font-size: 10px;
        position: relative;
        padding-left: 3px;
        padding-right: 6px;
        border-radius: 0 4px 4px 0;
        border: 1px solid #ddd;
        border-left: 0;
        min-width: 25px;
        display: block;
        line-height: 30px;
        text-align: center;
    }

    .counter-agree {
        background: #e5fdd5 !important;
        color: #3d9400;
    }

    .counter-disagree {
        background: #ffe6e3;
        color: #ED402A;
    }

    .follow-button {
        margin-top: 15px;
    }

    .profile-comment {
        margin-top: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
    }  

    .profile-comment {
        position: relative;
        border: 1px solid #ddd;
        background: #f5f5f5;
        font-size: 15px;        
    }

   .profile-avatar {
        margin-bottom: 15px;
    }

    .profile-actions {
        box-sizing: border-box;
    }

    .profile-actions button {
        width: 100%;
        height: 35px;     
        cursor: pointer;
    }

    .well-sm {
        padding: 0;
    }
   
    .profile-fields {
        border: 1px solid #d1d3d6;
        border-radius: 4px;
        margin-top: 15px;
        font-size: 12px;
    }

    .profile-fields .label-profile {
        background: #F0F3F7;   
        padding-left: 5px;
        text-transform: uppercase;
        color: #444;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        height: 30px;
    }

    .profile-fields .value-profile {
        background: #fff;
        padding-left: 5px;
        font-weight: bold;
        line-height: 63px;
        font-size: 30px;
        color: rgb(73,78,88);
        text-align: center;
        height: 65px;
    }

    .write-reply {
        width: 100%;
        position: relative;
        top: 4px;
        margin-top: 5px;
    }

    .card {
        margin-top: 20px;
    }

    h1 {
        font-family: 'Open Sans Condensed',sans-serif;
        font-weight: bold;
    }

    a {
        cursor: pointer;
    }

    .btn:active {
        background-image: none;
        outline: 0;
        -webkit-box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
        box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
    }

    .reply-data {
        background: #57A957;
        border: 1px solid #ddd;
        height: 30px;
    }

    .btn {
        font-size: 12px;
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    .btn-replies {
        background: #fff;
        /* position: absolute; */
        padding: 5px 12px;
        border-color: #b3c9dc;
        border-radius: 4px;
        /* left: 10px; */
        /* bottom: 5px; */
    }

    .btn-disagree {
        float:right; margin-right: 10px; border-color: #d6dbe2; color: #ED402A;
    }

    .btn-agree {
        color: #5cb85c;
        width: 30px;
    }

    .action-text {
        margin-left: 10px;
        color: #337ab7;
        font-size: 13px;
    }

    /*###Desktops, big landscape tablets and laptops(Large, Extra large)####*/
    @media screen and (min-width: 768px){
        .profile-page {
            overflow: auto;
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .left-sidebar {        
            width: 17%;      
        }

        .right-sidebar {            
             width: 75%;
         
        }

        .mobile-name {
            display: none;
        }

        .profile-comment::before {
            content: '';
            position: absolute;
            border-style: solid;
            border-width: 6px 12px 5px 0;
            border-color:  transparent #f5f5f5;           
            display: block;
            width: 0;
            z-index: 0;
            top: 5px;
            left: -12px;
        }

        .desktop-name {
            display: inline;
        }

        .main {
            padding-left: 3%;
            padding-right: 5px;
        }

        .destkop-profile-fields {
            display: inline;
        }

        .mobile-profile-fields {
            display: none;
        }
    }

    /* ###Tablet(medium)###
    @media screen and (min-width : 768px) and (max-width : 1023px){
        .left-sidebar {
            width: 33%;
        }
        .right-sidebar {
        }
    } */

    /*### Smartphones (portrait and landscape)(small)### */
    @media screen and (min-width : 0px) and (max-width : 767px){
        

        .left-sidebar {
            width: 100%;
            float: left;
        }

        .right-sidebar{
            width: 100%;
            float: left;
        }

        .mobile-name {
            display: inline;
            text-align: center;
        }

        .desktop-name {
            display: none;
        }

        .profile-page {
            overflow: auto;
            justify-content: center;
            margin-top: 20px;
        }

        .destkop-profile-fields {
            display: none;
        }

        .mobile-profile-fields {
            display: inline;
        }

        .mobile-profile-fields table thead {
            background: #d1d3d6;
        }

        .mobile-profile-fields table {width: 100%}

        .mobile-profile-fields table thead td {
            width: 25%;
            text-align: center;
            padding-top: 5px; padding-bottom: 5px;
        }

        .mobile-profile-fields table tbody td {
            text-align: center;
            font-weight: bold;
            font-size: 25px;
            padding-bottom: 10px; padding-top: 10px;
            color: rgb(73,78,88);
        }
    }

    .loader,
    .loader:before,
    .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
    }
    .loader {
    color: #17a2b8;
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    /* text-indent: -9999em; */
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
    content: '';
    position: absolute;
    top: 0;
    }
    .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
    }
    .loader:after {
    left: 3.5em;
    }

    .spinner {
        margin: auto;
    }

    .div-tab {
        
    }

    .activity-node-following {
        background: #0E70C2;
    }

    .activity-node {
        position: relative;
        left: 0;
        top: 3px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
 
    }

    .activity-node :hover {
        color: #000;
    }

    .activity-node a {
        color: #fff;
        
    }

    .activity-node a span {
        margin-top: 7px;
    }

    .fa {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        transform: translate(0,0);
    }

    .fa-user-plus:before {
        content: "\f234";
    }

    .activity-text {
        background: #F0F3F7;
        border: 1px solid #DDD;
        border-radius: 4px 4px 0 0;
        line-height: 35px;
        position: relative;
        font-size: 11px;
        height: 35px;
        display: flex;
    }

    .activity-text::before {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 6px 12px 5px 0;
        border-color:  transparent #F0F3F7;           
        display: block;
        width: 0;
        z-index: 0;
        top: 5px;
        left: -12px;     
    }

    .activity-content {     
        margin-left: 20px;
        width: 100%;
    }

    .div-activity {
        display: flex;
       
    }

    .entry-time {
        margin-left: 3%;
    }

    .user_name {
        font-weight: bold;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 12px;
    }

    .coin-avatar {
        padding-left: 5px;
        padding-right: 7px;
    }

    .activity-text a{
        font-weight: bold;
        font-size: 12px;
    }

    .coin-forum {
        padding-left: 5px;   
    }

    .content-body {
        margin-left: 48px;
        border: 1px solid #ddd;
        height: 100px;
        display: flex;
    }

    .image-photo {
        margin-left: 20px;
        margin-top: 10px;
    }

    .reply {
        margin-left: 15px;
        padding-top: 2px;
    }

    .reply-body {
        margin-left: 48px;
        border: 1px solid #ddd;
        background-color: #e0e9f5;
        display: flex;
    }

    .div-review {
        width: 100%;
        padding-left: 30px;
    }

    .div-review span {
        font-size: 23px;
        font-weight: bold;
    }

    .review-comment span {
        font-size: 14px;
        font-weight: normal;
    }
</style>