<?php

namespace RST\Resq\Domain;

class User extends AbstractDomain {
    const SALT = '2348klrjekl&*#@3dkjaclk3";w[29ud0asdu0213';

    protected $id;

    protected $email;

    protected $password;

    protected $telephone;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = sha1($password . self::SALT);
    }

    /**
     * @return mixed
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * @param mixed $telephone
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
    }

    public function getArrayCopy($includePassword = false)
    {
        return array(
            'id' => $this->getId(),
            'name' => $this->getEmail(),
            'telephone' => $this->getTelephone(),
            'password' => $includePassword ? $this->getPassword() : null,
        );
    }

    public function exchangeArray($data)
    {
        if (isset($data['id'])) {
            $this->setId($data['id']);
        }

        if (isset($data['email'])) {
            $this->setEmail($data['email']);
        }

        if (isset($data['telephone'])) {
            $this->setTelephone($data['telephone']);
        }

        if (isset($data['password'])) {
            $this->setPassword($data['password']);
        }
    }


}