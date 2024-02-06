import './angularjs';
import $ from "jquery";

window['angular'] = angular.module('AngularJSGlobalApp', [])
// var angular_app = 


/**
 * Centralizador de servicos
 */
window['angular'].run(function ($rootScope, $basic) {

    // disponibilizacoes no escopo raiz
    $rootScope.$basic = $basic;
    $rootScope.$ = $;
});

