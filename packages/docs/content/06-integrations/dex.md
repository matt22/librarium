---
title: 'Dex'
metaTitle: 'Dex'
metaDescription: 'Dex Authentication pack in Spectro Cloud'
hiddenFromNav: true
isIntegration: true
category: ['authentication']
logoUrl: 'https://raw.githubusercontent.com/spectrocloud/pax/master/experimental/addon/auth/dex/logo.png?token=APOFE6WZEUYZFQMKQPS4RTS67CU6I'
---

import WarningBox from '@librarium/shared/src/components/WarningBox';

# Dex

Dex is an identity service to drive authentication for Kubernetes API Server through the [OpenID Connect](https://openid.net/connect/) plugin. Clients such as kubectl can act on behalf users who can login to the cluster through any identity provider dex supports.

## Components

Dex integration in Spectro Cloud will deploy the following components:
* Dex.
* Dex Client (dex-k8s-authenticator).

The integration will create self-signed certificates, will cross-configure Dex, Dex Client components & will set appropriate flags on the Kubernetes API Server.

## References

https://github.com/dexidp/dex
https://github.com/dexidp/dex/blob/master/Documentation/kubernetes.md 
https://github.com/mintel/dex-k8s-authenticator
