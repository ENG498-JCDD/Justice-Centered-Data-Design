# 0.2-Version Control: Forking & Cloning

In this chapter, we will cover how to fork and clone repositories.

## 0.2.1 How to fork a repo

***Before we learn how to do do it, what's a fork?*** A fork is a copy of an existing repository for the purposes of creating an offshoot version from the original version. Think of fork as in the addage, ***Fork in the road***. Or, consider the following analogy:

1. Your friend started to write a story in a Word document.
2. You saved their story as a new file on your computer.
3. You revise and create your own version of the story without necessarily any intention on contributing back to the original version your friend created.

This sequence above is the implied social contract of a forked project. You may or may not have any goal to share your own work on the project back to the original story that your friend has created.

Here's how to easily fork a repo with Github.com's interface:

1. Go to this repo in my profile: <a href="https://github.com/lingeringcode/sjd-test" target="_blank" rel="noreferrer noopenner">https://github.com/lingeringcode/sjd-test</a>
2. Click on the **Fork** button: <img src="../assets/images/getting-started/installation/github-fork-button.png" style="box-shadow: rgb(150, 169, 17) 1px 1px 0px 1px;" width="100px">
3. Fork it to your profile/account.

Boom! That's it! Now you have your own copy of my original repo, which you can locate under your personal profile. The URL will follow this scheme: `https://github.com/YOURUSERNAME/REPONAME`.

<div class="example">
  <p>

If my repo was called `salazzle`, I could visit my repo on Github.com by adding my username, `lingeringcode`, to the URL scheme: `https://github.com/lingeringcode/salazzle`.

</p>
</div>

## 0.2.2 Clone the Forked Repo to Your Local Computer

After you complete the forking step, you copied a new version of a repo to your profile on Github's server. But, to work on the project, you need to create 1 more ***version*** of the forked repo by saving it to your **local computer** via GH's ***cloning*** action.

Before we learn how to clone your forked repo, let's review some terms: Local vs. Remote, and Clone.

### Know where you are working: Local versus Remote computers

Remember, git/Github is all about how to manage multiple versions of the same project. Helpful terms to start understanding versions is understanding where  versions are located.

- **Local** computer references the computer that you work on without any networked, i.e., *remote*, access.
- **Remote** references any repo external to your *local* computer's context.

### What's a cloned repo?

Cloning a repo copies the repo from a remote location, such as GH's servers. Any type of repo can be cloned, whether it is a fork, an original, a new repo, etc.

### How to clone a repo with Github Desktop

To save a repo to your local computer, we need to use the ***clone*** feature in Github Desktop (GHD). To clone the freshly forked repo from the previous step, complete the following steps in this video:

<video controls style="width: 620px; height:620px">
  <source src="../assets/vids/getting-started/00-gs-clone-repo.mp4" type="video/mp4" />
</video>

1. Open GHD.
2. Click on the **Current Repository** dropdown menu around the top-left corner.
3. Click on the **Add** button and select **Clone Repository**. A new window, *Clone a repository* should pop open on your screen.
4. In the new popup window, use the **Filter** searchbar to locate your desired repo to clone by typing in the name of the repo.
5. Once you identify the desired repo to clone, select it in the options. The repo's background should turn blue.
6. ***WARNING!*** **BEFORE YOU CLICK CLONE**, click the **Choose...** button, which prompts you to locate/create a folder in which to clone this repo. Choose a meaningful place to save your local repo.
    <p class="warning">
      Do <strong>NOT</strong> save your repo to any <strong>cloud-based folder (iCloud, Drive, Sharepoint, etc.)</strong> or your <strong>Desktop</strong>. Instead, consider creating a dedicated class folder and save the repo inside of that folder.
      <br>
      <br>
      If you save the project to a cloud-based folder, your computer will run very slowly or crash when you work through this textbook.
    </p>
7. Once you choose your desired local folder, which should not be a cloud-based folder, click the **Clone** button to complete the cloning process.

## 0.2.3 Test the GH setup by adding folders and files

Before we move forward, let's make sure that everything is working with GHD. Remember that GHD tracks changes like a Google Doc, but in a much more pedantic way. We can test it by making some small changes to see it in action and verify that everything will work for us. Follow along in the video below.

<video controls style="width: 620px; height:620px">
  <source src="../assets/vids/getting-started/00-gs-test-gh.mp4" type="video/mp4" />
</video>

1. Open the repo (folder) in **VS Code**.
2. Test to see if your git is tracking changes by adding a new file to the **very-interesting-folder**. Add the file in VS Code by selecting the folder, right-clicking on the folder and select "**New File**", then name the file **testing.txt**
3. Return to the Github Desktop app and see if the file's there. GH Desktop should have the file listed in the viewer pane on the left side.

## 0.2.4 Learning Review

Before you move forward, be sure that you understand the following ideas and procedures with GHD:

1. What **forks** are, and how to create them.
2. What **clones** are, and how to create them.
3. The difference between **local** versus **remote**, and why those differences in location matter.

## Submission

Submit an image of the following:

1. Your forked version of [https://github.com/lingeringcode/sjd-test](https://github.com/lingeringcode/sjd-test) in your GH profile online.
2. A cloned version of this fork on your local computer.
