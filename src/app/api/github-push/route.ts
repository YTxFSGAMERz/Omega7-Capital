import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { githubUsername, repoName, pat, repoDescription } = body;

    if (!githubUsername || !repoName || !pat) {
      return NextResponse.json(
        { success: false, error: "GitHub username, repo name, and PAT are required." },
        { status: 400 }
      );
    }

    // Validate PAT by checking GitHub user info
    let userResponse: { login: string };
    try {
      const res = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        return NextResponse.json(
          {
            success: false,
            error: `Invalid PAT or insufficient permissions: ${errData.message || res.statusText}`,
          },
          { status: 401 }
        );
      }
      userResponse = await res.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to validate PAT with GitHub API." },
        { status: 500 }
      );
    }

    // Use the authenticated user's username from GitHub API
    const actualUsername = userResponse.login;
    const description = repoDescription || "Omega 7 Capital - Premium Venture Capital Website built with Next.js 16, TypeScript, Tailwind CSS 4";

    // Check if repo already exists
    const existingRepo = await fetch(`https://api.github.com/repos/${actualUsername}/${repoName}`, {
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (existingRepo.ok) {
      // Repo exists, just push
      return pushToRepo(actualUsername, repoName, pat);
    }

    // Create the repository
    try {
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          name: repoName,
          description,
          private: false,
          auto_init: false,
        }),
      });

      if (!createRes.ok) {
        const errData = await createRes.json();
        return NextResponse.json(
          {
            success: false,
            error: `Failed to create repository: ${errData.message || createRes.statusText}`,
          },
          { status: 500 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to create repository on GitHub." },
        { status: 500 }
      );
    }

    // Push the code
    return pushToRepo(actualUsername, repoName, pat);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}

function pushToRepo(username: string, repoName: string, pat: string): NextResponse {
  const repoDir = "/home/z/my-project";

  try {
    // Remove existing remote if any
    try {
      execSync(`git -C "${repoDir}" remote remove origin`, { stdio: "pipe" });
    } catch {
      // No remote to remove, that's fine
    }

    // Add new remote with PAT
    const remoteUrl = `https://${pat}@github.com/${username}/${repoName}.git`;
    execSync(`git -C "${repoDir}" remote add origin "${remoteUrl}"`, { stdio: "pipe" });

    // Push to main branch
    execSync(`git -C "${repoDir}" push -u origin main --force`, {
      stdio: "pipe",
      timeout: 60000,
    });

    // Remove the PAT from remote URL for security
    execSync(`git -C "${repoDir}" remote set-url origin https://github.com/${username}/${repoName}.git`, {
      stdio: "pipe",
    });

    return NextResponse.json({
      success: true,
      message: `Successfully pushed to https://github.com/${username}/${repoName}`,
      url: `https://github.com/${username}/${repoName}`,
    });
  } catch (error) {
    // Clean up remote on failure
    try {
      execSync(`git -C "${repoDir}" remote remove origin`, { stdio: "pipe" });
    } catch {
      // Ignore cleanup errors
    }

    return NextResponse.json(
      {
        success: false,
        error: `Git push failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
