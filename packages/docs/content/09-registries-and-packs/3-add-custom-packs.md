---
title: "Adding a custom pack"
metaTitle: "Adding a custom pack"
metaDescription: "How to create and use custom made packs and registries in Spectro Cloud"
icon: ""
hideToC: false
fullWidth: false
---

import InfoBox from '@librarium/shared/src/components/InfoBox';

import WarningBox from '@librarium/shared/src/components/WarningBox';

# Add custom packs

Custom packs are built by users and deployed to custom registries using Spectro Cloud’s CLI tool.

# Steps to create a custom pack

1. Create a directory with a suitable name for all the pack contents. Example: `prometheus_1_0`
2. Create a metadata file named `pack.json` to describe the pack. Example:
    ```
    {
        "annotations": {
            "name": "value",
        },
        "ansibleRoles": [],
        "displayName": "<PACK_DISPLAY_NAME>",
        "eol": "2028-04-30",
        "group": "<PACK_GROUP>",
        "kubeManifests": [
            "manifests/deployment.yaml"
        ],
        "layer": "<LAYER>",
        "name": "<PACK_NAME>",
        "version": "<PACK_VERSION>"
    }
    ```

An explanation for the parameters of the JSON is given in the table below:

| Property Name | Data type | Required | Description |
| --- | --- | --- | --- |
| name | String | True | Name of the pack |
| displayName | String | True | Name of the pack as it is to be displayed on the Spectro tenant console |
| layer | String | True | Relevant layer that this pack should be part of; such as os, k8s, cni, csi, addon |
| addon-type | String | False | Addon-type must be set for packs that have layer set to ‘add-on’. Value must be one of : logging, monitoring, load balancer, authentication, ingress, security. Setting a relevant correct add-on type ensures packs are organized correctly on the tenant console making it easy for profile authors to find packs. |
| version | String | True | A Sematic version for the pack. It is recommended that pack version be the same as the underlying integration it is being created for. For example, the version for pack that will install prometheus 2.3.4, should set to 2.3.4. |
| cloudTypes | Array | True | Supported cloud types are aws, azure, vmware. One or more types can be provided for a pack. |
| group | String | False | Optional categorization of packs. For example, LTS can be set for Ubuntu OS packs. |
| annotations | Array | False | Optional key-value pairs required during pack installation. Typically custom packs do not need to set annotations. Some packs like the ones for OS require annotations need to be set with an image id. |
| eol | String | False | End of life date for integration. |
| kubeManifests | Array | False | Relative path to kubernetes manifest yaml files |
| ansibleRoles | Array | False | Relative part to the Ansible role folders. These folders should contain all the artifacts required by Ansible. Please refer to Ansible documentation for more details on how Ansible roles are constructed. |
| | | | In Spectro Cloud, Ansible roles are used to customize OS image used for cluster nodes. Typically, these are roles that perform tasks like hardening the OS, installing monitoring agents etc. |
| charts | Array | False | Relative path to the helm chart archives. |

3. Create a file named “values.yaml”. This file consists of configurable parameters that need to be exposed to the end users during creation of a cluster profile. Parameters for all charts, manifests and Ansible roles defined in the pack are defined in this file. Helm charts natively support values override. Any values defined are merged with those defined within a chart. Manifests and Ansible roles need to be explicitly templatized if parameter configuration is desired.

```
pack:
  namespace : <default namespace for charts and manifests>
charts:
  chart1:
    <configurable chart1 parameters>
  chart2:
    <configurable chart2 parameters>
manifests:
  manifest1:
  	<templatized manifest1 parameters>
  manifest2:
  	<templatized manifest2 parameters>
ansibleRoles:
  role1:
    <templatized role1 parameters>
  role2:
  	<templatized role2 parameters>
```

4. A pack must have the logo file named `logo.png` and must be copied into the pack directory.
5. Login to the pack registry using the following command:

```
$spectro registry login [REGISTRY_SERVER]
```

6. Push the newly defined pack to the registry using the following command:

```
$spectro pack push [PACK_DIR_LOCATION] --registry-server [REGISTRY_SERVER]
```

7. To overwrite contents of a previously deployed pack, use the force option as follows:

```
$spectro pack push [PACK_DIR_LOCATION] -f --registry-server [REGISTRY_SERVER]
```

# Adding an OS Pack

The OS is one of the core layers in a cluster profile. An OS pack can be built to use a custom OS image for cluster nodes. This might be desirable if an organization wants to use an approved hardened OS image for their infrastructure. There are typically the following two scenarios for the OS image:

1. Pre-Installed Kubernetes - The OS image has the desired version of Kubernetes components like kubelet, kubectl, etc installed.
2. Vanilla OS Image - Kubernetes components are not installed.

Additionally, for both the scenarios additional components or packages may need to be installed at runtime to prepare the final OS image. This can be done by specifying one or more ansible roles in the pack. The following are a few examples of building custom OS pack to cover the some of these scenarios.

A few sample pack manifests for building a custom OS pack are shown in the following examples. These are examples for images that do not have Kubernetes components pre-installed. Spectro Cloud installs these components at the time of provisioning. The version of Kubernetes that gets installed depends on the Kubernetes pack configuration in the cluster profile. If Kubernetes is pre-installed in the image, the flag `skipK8sInstall` should be set to true.

# Example 1 - AWS Custom-OS Pack

```
{
    "annotations": {
        "cloudRegion": "us-east-1", 
        "imageId": "ami-071f6fc516c53fca1", 
        "imageOwner": "421085264799", 
        "osName": "centos", 
        "os_spectro_version": "0", 
        "sshUsername": "centos",
        "skipK8sInstall": "false"
    }, 
    "ansibleRoles": [
        "harden_os"
    ], 
    "cloudTypes": ["aws"], 
    "displayName": "CentOS", 
    "eol": "2024-06-30", 
    "group": "", 
    "kubeManifests": [], 
    "layer": "os", 
    "name": "golden-centos-aws", 
    "version": "7.7.1908"
}
```

# Example 2 - VMWare Custom OS Pack - Local Image

```
{
    "annotations": {
        "folder": "spectro-templates", 
        "imageId": "/Datacenter/vm/spectro-templates/base-images/centos-7-vanilla-with-vm-tools", 
        "osName": "centos", 
        "os_spectro_version": "0", 
        "sshPassword": "password", 
        "sshUsername": "root",
        "skipK8sInstall": "false"
    }, 
    "ansibleRoles": [
        "harden_os"
    ], 
    "cloudTypes": ["vsphere"], 
    "displayName": "CentOS", 
    "eol": "2024-06-30", 
    "group": "", 
    "kubeManifests": [], 
    "layer": "os", 
    "name": "golden-centos-vsphere", 
    "version": "7.7.1908"
}
```

# Example 3 - VMWare Custom OS Pack - Remote Image

```
{
    "annotations": {
        "folder": "spectro-templates", 
        "imageId": "https://cloud-images.ubuntu.com/releases/18.04/release/ubuntu-18.04-server-cloudimg-amd64.ova", 
        "osName": "ubuntu", 
        "os_spectro_version": "0", 
        "sshUsername": "ubuntu",
        "skipK8sInstall": "false"
    }, 
    "ansibleRoles": [
        "harden_os"
    ], 
    "cloudTypes": ["vsphere"], 
    "displayName": "Ubuntu", 
    "eol": "2028-04-30", 
    "group": "LTS", 
    "kubeManifests": [], 
    "layer": "os", 
    "name": "golden-ubuntu-vsphere", 
    "version": "18.04.4"
}
```

# Example 4 - Azure Custom OS Pack

```
{
    "annotations": {
        "imageOffer": "CentOS", 
        "imagePublisher": "OpenLogic", 
        "imageSKU": "7.7", 
        "osName": "centos", 
        "os_spectro_version": "0", 
        "sshUsername": "centos",
        "skipK8sInstall": "true"
    }, 
    "ansibleRoles": [
        "harden_os"
    ], 
    "cloudTypes": ["azure"], 
    "displayName": "CentOS", 
    "eol": "2024-06-30", 
    "group": "", 
    "kubeManifests": [], 
    "layer": "os", 
    "name": "golden-centos-azure", 
    "version": "7.7.1908"
}
```

In all the examples above, an additional customization in the form of an Ansible role called `harden_os` is specified in the pack manifest. The tasks and other files for the implementation of this role need to be included in the pack. The final directory structure of for the pack would be as follows:
```
./pack.json
./logo.png
./values.yaml
./harden_os
./harden_os/tasks
./harden_os/tasks/main.yml
./harden_os/files
./harden_os/files/sec_harden.sh
```

Ansible roles are optional and only required if additional runtime customization is required. Once an OS pack is constructed, push it to the pack registry using the Spectro CLI tool.

<InfoBox>
A <i>values.yaml</i> file is mandatory for every pack. For an OS pack, there are typically no configurable parameters, but an empty file still needs to be added to the OS pack.
</InfoBox>

<InfoBox>
During the image customization phase of a cluster deployment, failures related to missing packages or package version mismatch might occur when using a custom OS pack. These errors are presented on the console. The image needs to be updated to resolve any such issues.
</InfoBox>
