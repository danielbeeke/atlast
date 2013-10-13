require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/sass-bootstrap/js/modal',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition',
        leaflet: '../bower_components/leaflet/dist/leaflet',
        twig: '../bower_components/twig.js/twig',
        once: '../bower_components/jquery-once/jquery.once',
        swiper: '../bower_components/swiper/dist/idangerous.swiper-2.2'
    },
    shim: {
        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapCollapse: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapModal:{
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapPopover: {
            deps: ['jquery', 'bootstrapTooltip']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTooltip: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTransition: {
            deps: ['jquery']
        },
        plate: {
            deps: ['jquery']
        },
        map: {
            deps: ['jquery', 'leaflet']
        },
        twigloader: {
            deps: ['jquery', 'twig']
        },
        bootstrap: {
            deps: ['jquery', 'twigloader', 'bootstrapModal', 'once', 'plate', 'swiper']
        },
        combiner: {
            deps: ['jquery', 'twigloader', 'bootstrapModal', 'once', 'plate']
        }
    },
    atlast: {
        slug: 'henk-jansen',
    }
});

require(['jquery', 'bootstrap', 'map'], function ($, bootstrap, map) {
    'use strict';

    bootstrap.init(function() {
        map.init()
    })
});
