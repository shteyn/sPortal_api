import nodemailer from "nodemailer";

const from = '"Student_Portal" <info@dci.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function contactUsEmail(data) {
  console.log("transport.sendMail", data);
  const transport = setup();
  const mailOpts = {
    from: data.name + " &lt;" + data.email + "&gt;",
    to: process.env.MAILRECEIVER,
    subject: `New message from "Contact Us form" at Alumni Book`,
    html: `
    <p>Requester type: ${data.inContact}</p>
    <p>Name: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Location: ${data.location}</p>
    <p>Message: ${data.question}</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (error) {
      console.log("contact-failure", error);
      res.render("contact-failure");
    } else {
      console.log("contact-success", error);
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Registration Confirmation",
    text: `Dear ${user.firstName},

    Thank you again for your registration with DCI Students Book.
    
    Please confirm your email following the link bellow , so the administration team will be able to get get and review your request.
    ${user.generateConfirmationUrl()}
    Best regards,
    DCI-Team`
  };
  transport.sendMail(email);
}

export function approvedUserEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Registration Confirmation",
    text: `Dear ${user.firstName},
    
    Your profile has been verified and you now have access to complete the requested information.
    
    http://localhost:3000/

    Best regards,
    DCI-Team`
  };
  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Reset Password",
    text: `Please click follow this link to reset your password.
    ${user.generateResetPasswordUrl()}`
  };
  transport.sendMail(email);
}

export function sendRejectEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Registration Request",
    text: `Dear ${user.firstName},

    Unfortunately your registration with DCI Alumni Book has been rejected.
    
    For more information please contact ​graduates@digitalcareerinstitute.org​.
    
    Best regards,
    DCI-Team`
  };
  transport.sendMail(email);
}

export function sendDeleteUserEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Account Status Notification",
    text: `Dear ${user.firstName},

    Your profile at DCI Alumni Book has been deleted.
    
    For more information please contact ​graduates@digitalcareerinstitute.org​.
    
    Best regards,
    DCI-Team`
  };
  transport.sendMail(email);
}

export function userDeletedHisAccountEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Account Status Notification",
    text: `Dear ${user.firstName},

    Your profile at DCI Alumni Book has been deleted.
    
    Best regards,
    DCI-Team`
  };
  transport.sendMail(email);
}
