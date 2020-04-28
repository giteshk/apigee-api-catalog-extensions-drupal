var SDKGenerator = {
  clients: {
    'csharp': '<i class="fab fa-windows"></i>',
    'java': '<i class="fab fa-java"></i>',
    'python': '<i class="fab fa-python"></i>',
    'javascript': '<i class="fab fa-node"></i>'
  },
  apiName: '',
  specJson: {},
  loadSpec: function (url, sdk_container) {
    var sdkObj = this;
    jQuery.get(url, function (data) {
      if (url.endsWith(".json")) {
        sdkObj.specJson = data;
      } else {
        sdkObj.specJson = jsyaml.load(data);
      }
      sdkObj.generateWidgets(sdk_container);
    })
  },
  generateWidgets: function ($sdk_container) {
    var sdkObj = this;
    if ($sdk_container) {
      jQuery.each(this.clients, function (sdk, icon) {
        $sdk_container.append(
            "<a class='sdk-icon sdk-type-" + sdk + "' data-sdk-framework='"
            + sdk + "' href='javascript:SDKGenerator.downloadSDK(\"" + sdk
            + "\");'>" + icon + "</div>");
      })
    }
  },
  downloadSDK: function (sdk) {
    var sdkObj = this.specJson;
    var apiName = this.apiName;
    var sdk_gen_request = {
      lang: sdk,
      spec: sdkObj,
      type: "CLIENT",
      codegenVersion: "V2"
    };
    jQuery.ajax({
      url: "https://generator3.swagger.io/api/generate",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(sdk_gen_request),
      xhrFields: {
        responseType: "blob"
      },
      success: function (data) {
        var blob = new Blob([data], {
          type: 'octet/stream'
        });
        var downloadUrl = URL.createObjectURL(blob);
        a = document.createElement("a");
        a.style = "display: none";
        a.class = sdk + "-target";
        a.href = downloadUrl;
        a.download = apiName.replace(/\s+/g, "-").replace("/\./g", "-")
            + "-" + sdk + "-sdk.zip";
        document.body.appendChild(a)
        a.click();
        URL.revokeObjectURL(downloadUrl);
      }
    });
  },
  init: function (url, selector_str, apiName, context) {
    var sdk_container = jQuery(selector_str, context).once(
        "sdk-container-processed");
    if (sdk_container.length > 0) {
      this.apiName = apiName;
      this.loadSpec(url, sdk_container);
    }
  }
}
