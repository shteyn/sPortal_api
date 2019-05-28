import nodemailer from "nodemailer";

const from = '"Alumni Book Portal" <info@dci.com>';

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

export function contactStudentEmail(data) {
  const transport = setup();
  const mailOpts = {
    from: data.name + " &lt;" + data.email,
    to: data.studentEmail,
    subject: `New message from ${data.inContactStudent} - ${
      data.name
    } at Alumni Book`,
    html: `<p>${data.question}</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function contactUsEmail(data) {
  const transport = setup();
  const mailOpts = {
    from: data.name + " &lt;" + data.email,
    to: process.env.ADMIN_MAIL,
    subject: `New message from "Contact Us form" at Alumni Book`,
    html: `
    <p>Requester type: ${data.inContact}</p>
    <p>Name: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Location: ${data.location}</p>
    <p>Message: ${data.question}</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const mailOpts = {
    from,
    to: user.email,
    subject: "DCI Alumni Book Portal | Email Confirmation",
    html: `
    <p>Dear ${user.firstName},</p>
    <p>Thank you for your registration with DCI Alumni Book.</p>
    <p>Please confirm your email following <a href="${user.generateConfirmationUrl()}">this link</a>, so the administration team will be able to get and review your request.</p>
    
    <p>Best regards,</p>
    <p>DCI-Team</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function approvedUserEmail(user) {
  const transport = setup();
  const mailOpts = {
    from,
    to: user.email,
    subject: "DCI Alumni Book Portal | Registration Confirmation",
    html: `
    <p>Dear ${user.firstName},</p>
    <p>Your profile has been verified and you now have access to complete the requested information.</p>
    <a href=${process.env.HOST}/dashboard>Go to DCI Alumni Book Portal</a>
  
    <p>Best regards,</p>
    <p>DCI-Team</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const mailOpts = {
    from,
    to: user.email,
    subject: "DCI Alumni Book Portal | Reset Password",
    html: `
    <p>Please click follow <a href="${user.generateResetPasswordUrl()}">this link</a>, to reset your password.</p>
  
    <p>Best regards,</p>
    <p>DCI-Team</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function sendRejectEmail(user) {
  const transport = setup();
  const mailOpts = {
    from,
    to: user.email,
    subject: "DCI Alumni Book Portal | Registration Request",
    html: `
    <p>Dear ${user.firstName},</p>
    <p>Unfortunately your registration with DCI Alumni Book has been rejected.</p>
    <p>For more information please contact ​graduates@digitalcareerinstitute.org​.</p>
  
    <p>Best regards,</p>
    <p>DCI-Team</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function sendDeleteUserEmail(user) {
  const transport = setup();
  const mailOpts = {
    from,
    to: user.email,
    subject: "DCI Alumni Book Portal | Account Status Notification",
    html: `
    <p>Dear ${user.firstName},</p>
    <p>Your profile at DCI Alumni Book has been deleted.</p>
    <p>For more information please contact ​graduates@digitalcareerinstitute.org​.</p>
  
    <p>Best regards,</p>
    <p>DCI-Team</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}

export function userDeletedHisAccountEmail(user) {
  const transport = setup();
  const mailOpts = {
    from,
    to: user.email,
    subject: "DCI Alumni Book Portal | Account Status Notification",
    html: `
    <p>Dear ${user.firstName},</p>
    <p>Your profile at DCI Alumni Book has been deleted.</p>
  
    <p>Best regards,</p>
    <p>DCI-Team</p>`
  };
  transport.sendMail(mailOpts, function(err, res) {
    if (err) {
      res.render("contact-failure");
    } else {
      res.render("contact-success", res);
    }
    transport.close();
  });
}
