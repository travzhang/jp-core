import { defineConfig } from '@rstest/core';

export default defineConfig({
    testEnvironment: 'node',
    coverage:{
        enabled:true,
        provider: 'istanbul',
        reporters:['json','@canyonjs/report-html'],
    }
});
