// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

      function fail() {
        console.log("failed to get filesystem");
      }

      function gotFS(fileSystem) {
        window.rootFS = fileSystem.root;
      }
    });
  })

  .controller('AppCtrl', function($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      animation: 'slide-in-up',
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.getEntry = function(entry) {
      if (entry.isDirectory) {
        var reader = entry.createReader();
        reader.readEntries(function(entries) {
          $scope.entries = entries;
          $scope.$apply();
        }, function(err) {
          console.log('FAIL - ' + err.code);
        });
      } else {
        $scope.selected = entry;
        $scope.media = new Media($scope.selected.fullPath);
        $scope.closeModal();
      }
    };

    $scope.pause = function() {
      $scope.media.pause();
    };

    $scope.play = function() {
      $scope.media.pause();
      $scope.media.seekTo(0);
      $scope.media.play();
    };

    $scope.openModal = function() {
      $scope.getEntry(window.rootFS);
      $scope.modal.show();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });
