## Got a question or problem?

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests.

## You think you've found a bug?

Oh, we are ashamed and want to fix it asap! But before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a _minimal_ reproduce scenario using http://plnkr.co/. Having a live reproduce scenario gives us welth of important information without going back & forth to you with additional questions like:
* version of AngularJS used
* version of this library that you are using
* 3rd-party libraries used, if any
* and most importantly - a use-case that fails 

A minimal reproduce scenario using http://plnkr.co/ allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem. 

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimatelly be able to fix more bugs. Interestingly, from our experience users often find coding problems theimselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

The best part is that you don't need to create plunks from scractch - you can for one from our [demo page](http://clickataxi.github.io/dd-ui/).

Unfortunatelly we are not able to investigate / fix bugs without a minimal reproduce scenario using http://plnkr.co/, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.


## You want to contribute some code?

We are always looking for the quality contributions and will be happy to accept your Pull Requests as long as those adhere to some basic rules:

* Please make sure that your contribution fits well in the project's context:
  * we are aiming at rebuilding ui directives in pure AngularJS, without any dependencies on any external JavaScript library;
  * directives should be html-agnostic as much as possible which in practice means:
        * templates should be referred to using the `templateUrl` property
        * it should be easy to change a default template to a custom one
        * directives shouldn't manipulate DOM structure directly (when possible)
* Please assure that you are submitting quality code, specifically make sure that:
  * your directive has accompanying tests and all the tests are passing
  * your PR doesn't break the build; check the Travis-CI build status after opening a PR and push corrective commits if anything goes wrong
