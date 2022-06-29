chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(tab);
    if (changeInfo.status === 'loading' && tab.url.indexOf("qd.zhangnew.com") != -1) {
        if (!chrome.runtime.onConnect.hasListeners()) {
            chrome.runtime.onConnect.addListener(function(port) {
                console.assert(port.name == "get_cookie");
                port.onMessage.addListener(function(request) {
                    console.log(request);
                    if (request.do == "get_cookie") {
                        var option = {};
                        if (request.site) {
                            option["url"] = request.site;
                        }
                        if (request.name != null) {
                            option["name"] = request.name;
                        }
                        if (request.domain) {
                            option["domain"] = request.domain;
                        }
                        chrome.cookies.getAll(option, function(cookies) {
                            var obj = {};
                            for (var i in cookies) {
                                var cookie = cookies[i];
                                obj[cookie.name] = cookie.value;
                            }
                            port.postMessage(obj);
                            console.log(obj);
                        });

                    }
                });
            });
        }

    }

});

