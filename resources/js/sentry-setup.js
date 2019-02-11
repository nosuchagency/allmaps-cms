import Vue from 'vue';
import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://8d3f5dc996fc4f3da0758a12d8e3d99b@sentry.io/1340503',
        integrations: [new Sentry.Integrations.Vue({Vue})]
    });
} else {
    console.log('Not configuring Sentry, environment is:', process.env.NODE_ENV);
}